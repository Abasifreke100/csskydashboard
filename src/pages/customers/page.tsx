import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Search } from "lucide-react";
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
  const totalItems = data?.data?.pagination?.total || 0;

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
        axiosInstance.post(`${endpoint}/${id}`)
      );
      setLoading(true);
      await Promise.all(verificationPromises);
      // Optionally, after all verifications are done, you may want to fetch updated data
      // Example: refetchData();
    } catch (error) {
      console.error("Error verifying individuals:", error);
      // Handle error, show error message, etc.
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
setSelected(tabs[0])
  },[type])


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
            <div className="w-full  mt-4 lg:mt-0 lg:w-fit h-fit p-0  flex justify-end ">
              <button
                className="relative bg-primary hover:scale-95 h-fit w-[200px] mt-0 text-white text-xs px-4 py-2 shadow rounded-md overflow-hidden group transform transition duration-300 ease-in-out"
                onClick={handleVerifySelected}
              >
                <span className="absolute inset-0  opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
                <span className="relative group-hover:scale-105 group-focus:scale-105">
                  {loading
                    ? "Verifying..."
                    : ` Verify Selected
                  ${type === "individual" ? "Individuals" : "Corporate"}`}
                </span>
              </button>
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
