import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { CircleCheckBig, Search, Upload } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Corporate, CustomerResponse, Response } from "../../types";
import { tableHeader, tabs, useProviderContext } from "../../constants";
import { Chip } from "../../utils/tab-chip";
import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import axiosInstance from "../../api/connectSurfApi";
import { getInitials } from "../../utils/getInitials";
import { formatDate } from "../../utils/formatDate";
import CustomPaginationContent from "../../utils/pagination";
import { Checkbox } from "../../components/checkbox";
import { CustomerTableSkeleton } from "../../skeleton/customerTable";
import Header from "../../components/global/header";
import { errorToast, successToast } from "../../utils/toast";
import { Button } from "../../components/ui/button";

const renderCellContent = (cellData: Response | Corporate): JSX.Element => {
  let badgeBgColor = "";
  let badgeText = "";

  if (
    (cellData as Response)?.isNinVerified ||
    (cellData as Corporate)?.director?.isNinVerified
  ) {
    badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
    badgeText = "Verified";
  } else if (
    (cellData as Response)?.nin == undefined ||
    (cellData as Corporate)?.director?.nin == undefined
  ) {
    badgeBgColor = "bg-secondary hover:bg-secondary text-primary";
    badgeText = "Pending";
  } else if (
    ((cellData as Response)?.nin !== undefined &&
      (cellData as Response)?.isNinVerified === false) ||
    ((cellData as Corporate)?.director?.nin !== undefined &&
      (cellData as Corporate)?.director?.isNinVerified === false)
  ) {
    badgeBgColor = "bg-lightRed hover:bg-lightRed text-deepRed";
    badgeText = "Failed";
  }

  return <Badge className={badgeBgColor}>{badgeText}</Badge>;
};

const CustomersPage = () => {
  const { type } = useParams<{ type: "individual" | "corporate" }>();
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CustomerResponse | null>(null);
  const { currentPage, setCurrentPage } = useProviderContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1); // Reset the current page to 1 when type changes
  }, [selected]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Determine the status parameter based on the selected tab
      let statusParam = "";
      if (selected === "pending") {
        statusParam = "&isNinVerified=0";
      } else if (selected === "verified") {
        statusParam = "&isNinVerified=1";
      }
      const url = `/${type}?currentPage=${currentPage}${statusParam}`;

      // Fetch data from the API
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setData(response.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (type === "corporate" || type === "individual") {
      fetchData();
    }
  }, [type, currentPage, selected]);

  const itemsPerPage = 10;
  const totalItems = data?.data?.pagination?.total ?? 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    cellData: Response | Corporate
  ) => {
    const checkboxClicked = (event.target as HTMLElement).closest(
      'input[type="checkbox"]'
    );

    if (!checkboxClicked) {
      navigate(`/customers/${type}/${cellData._id}`);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        data?.data?.response.map((cellData) => cellData._id) || []
      );
    }
    setSelectAll(!selectAll);
  };

  const handleVerifySelected = async () => {
    try {
      const endpoint = `/${type}/verify/nin`;
      console.log("selectedRows", selectedRows);

      const verificationPromises = selectedRows.map((id) =>
        axiosInstance
          .post(`${endpoint}/${id}`)
          .then(() => ({ id, status: "fulfilled" }))
          .catch(() => ({ id, status: "rejected" }))
      );

      setLoading(true);
      const results = await Promise.allSettled(verificationPromises);

      // Filter fulfilled results
      const fulfilled = results
        .filter(
          (
            result
          ): result is PromiseFulfilledResult<{ id: string; status: string }> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value.id); // Fulfilled promises have a `value` property

      // Filter rejected results
      const rejected = results
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected"
        )
        .map((result) => result.reason?.id || "Unknown"); // Rejected promises have a `reason` property

      if (fulfilled.length > 0) {
        successToast({
          title: "Success",
          message: `Verification successful for all users. If pending, the NIN is invalid or not provided.`,
        });
      }

      if (rejected.length > 0) {
        errorToast({
          title: "Partial Error",
          message: `Verification failed for users: ${rejected.join(
            ", "
          )} due to NIN initialization error or NIN currently unavailable.`,
        });
      }
    } catch (error) {
      console.error("Unexpected error during verification:", error);
      errorToast({
        title: "Error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setSelectAll(false);
      setSelectedRows([]);
      setLoading(false);
      fetchData();
    }
  };

  const fixedType = type as string;

  // clear selected checkbox

  useEffect(() => {
    setSelectAll(false);
    setSelectedRows([]);
  }, [selected]);

  useEffect(() => {
    setSelected(tabs[0]);
  }, [type]);

  return (
    <div className="h-screen screen-max-width">
      <Header title={fixedType} />
      <Breadcrumb className="mt-4 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Customers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {type === "corporate" ? "Corporate" : "Individual"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center w-full gap-3 ">
        <div className="overflow-hidden flex-col lg:flex-row w-full  lg:justify-between flex lg:items-center flex-nowrap gap-2">
          <div className="w-fit pt-6 lg:py-6 whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
            {tabs.map((tab) => (
              <Chip
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
                key={tab}
                data={data}
              />
            ))}
          </div>
          <div className="w-full lg:w-[500px]">
            <div className="bg-white flex w-full items-center   px-1 py-1 rounded-xl gap-2">
              <div className="flex-1 ">
                <div className="flex text-grey items-center">
                  <Search className="h-5" />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search Customer "
                    className="flex-1 lg:ml-2 border-none h-7 text-xs placeholder:text-sm outline-none"
                  />
                </div>
              </div>
              <p className="bg-grey rounded-[12px] text-white py-1.5 px-2 text-xs h-full">
                Search
              </p>
            </div>
          </div>
          {selectedRows.length > 0 && selected === "pending" && (
            <div className="w-full  mt-4 lg:mt-0 lg:w-fit h-fit p-0 gap-3 flex justify-end ">
              <Button
                variant="outline"
                className="flex gap-2 rounded-full"
                onClick={handleVerifySelected}
              >
                <CircleCheckBig />
                <span className="relative">
                  {loading ? "Verifying..." : ` Verify`}
                </span>
              </Button>
              <Button className="flex gap-2 rounded-full" variant="outline">
                <Upload />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border  rounded-lg">
        <table className="w-full text-sm  text-gray-500">
          <thead className="text-xs  uppercase  bg-[#F5F5F7]">
            <tr className="font-medium border-b border-gray-200 text-muted-foreground">
              <th className="px-2 py-[9px] font-medium text-muted-foreground">
                <Checkbox
                  id="select-all"
                  isChecked={selectAll}
                  onChange={() => handleSelectAllChange()}
                />
              </th>
              {tableHeader.map((header, idx) => (
                <th
                  scope="col"
                  key={idx}
                  className={`${
                    idx === 0 ? "" : "whitespace-nowrap"
                  } px-6 capitalize font-medium py-[9px] text-[#000000E5] text-sm ${
                    header === "Name" ? "text-start" : ""
                  } ${idx === 6 ? "" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <CustomerTableSkeleton />
            ) : (data?.data?.response?.length ?? 0) > 0 ? (
              data?.data?.response.map((cellData, idx) => (
                <tr
                  key={idx}
                  onClick={(event) => handleRowClick(event, cellData)}
                  className="border group border-b cursor-pointer transition-colors  hover:bg-muted/50 data-[state=selected]:bg-muted bg-white border-[#F5F5F7]"
                >
                  <td className="px-2 py-2">
                    <Checkbox
                      id={cellData._id}
                      isChecked={selectedRows.includes(cellData._id)}
                      onChange={(id, isChecked) => {
                        if (isChecked) {
                          setSelectedRows((prev) => [...prev, id]);
                        } else {
                          setSelectedRows((prev) =>
                            prev.filter((item) => item !== id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-2 flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={
                          (cellData as Response)?.biometrics?.selfie
                            ? (cellData as Response)?.biometrics?.selfie
                            : (cellData as Corporate)?.bioMetrics?.selfie
                        }
                      />
                      <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                        {(cellData as Response)?.firstName &&
                        (cellData as Response)?.surName
                          ? getInitials(
                              `${(cellData as Response)?.firstName} ${
                                (cellData as Response)?.surName
                              }`
                            )
                          : getInitials(
                              `${(cellData as Corporate)?.companyName} `
                            )}
                      </AvatarFallback>
                    </Avatar>
                    {!(cellData as Corporate).registrationNumber ? (
                      <div className="">
                        <p className="text-xs text-black font-medium group-hover:text-grey">{`${
                          (cellData as Response)?.title
                        } ${(cellData as Response)?.firstName} ${(
                          cellData as Response
                        ).surName?.substring(0, 10)}`}</p>
                        <p className="text-xs text-grey ">
                          {(cellData as Response).email?.substring(0, 20)}...
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-black font-medium group-hover:text-grey">{`${
                          (cellData as Corporate).companyName?.length > 20
                            ? (cellData as Corporate).companyName?.substring(
                                0,
                                20
                              ) + "..."
                            : (cellData as Corporate).companyName
                        }`}</p>
                        <p className="text-[10px] text-grey">
                          {(cellData as Corporate).companyWebsite}...
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-2 text-center">
                    {(cellData as Response)?._id
                      ? `${
                          (cellData as Response)._id.length > 20
                            ? (cellData as Response)._id?.substring(0, 20) +
                              "..."
                            : (cellData as Response)?._id
                        }`
                      : (cellData as Corporate)?.registrationNumber}
                  </td>
                  <td className="px-6 py-2">{renderCellContent(cellData)}</td>
                  <td className="px-6 py-2 text-center">
                    {formatDate(cellData.createdAt)}
                  </td>
                  <td className="px-6 py-2 text-center">
                    {formatDate(cellData.updatedAt)}
                  </td>
                  <td className="px-6 py-2 capitalize text-grey text-sm">
                    {type}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan={7}>
                  <p className="text-center text-grey py-4">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomPaginationContent
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CustomersPage;
