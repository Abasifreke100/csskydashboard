import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { EllipsisVertical, Eye, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Corporate, CustomerResponse, Response } from "../../types";
import { tableHeader, tabs, useProviderContext } from "../../constants";
import { Chip } from "../../utils/tab-chip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
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
import CustomerTableSkeleton from "../../skeleton/customerTable";
import CustomPaginationContent from "../../utils/pagination";

const renderCellContent = (cellData: Response | Corporate): JSX.Element => {
  let badgeBgColor = "";

  if (
    "biometrics" in cellData &&
    cellData.biometrics?.fingerPrint &&
    cellData.biometrics?.selfie
  ) {
    badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
  } else if ("companyName" in cellData) {
    badgeBgColor = "bg-secondary hover:bg-secondary text-primary";
  } else {
    badgeBgColor = "bg-lightRed hover:bg-lightRed text-deepRed";
  }

  return (
    <Badge className={badgeBgColor}>
      {"biometrics" in cellData &&
      cellData.biometrics?.fingerPrint &&
      cellData.biometrics?.selfie
        ? "Verified"
        : "Failed"}
    </Badge>
  );
};

const CustomersPage = () => {
  const { type } = useParams<{ type: "individual" | "corporate" }>();
  const [selected, setSelected] = useState(tabs[0]);
  const navigate = useNavigate();
  const [data, setData] = useState<CustomerResponse | null>(null);
  const { currentPage, setCurrentPage } = useProviderContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/${type}?currentPage=${currentPage}`
        );
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

    if (type === "corporate" || type === "individual") {
      fetchData();
    }
  }, [type, currentPage]);

  const itemsPerPage = 10;
  const totalItems = data?.data?.pagination?.total || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen screen-max-width">
      <p className="text-xl font-semibold">Customers</p>
      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
        <div className="overflow-hidden">
          <div className=" py-10 whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
            {tabs.map((tab) => (
              <Chip
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
                key={tab}
                totalItems={totalItems}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 hidden">
          <div className="flex bg-white rounded-xl py-2 px-1 items-center">
            <Search className="h-4 text-grey" />
            <Input
              className="h-6 border-none bg-transparent outline-none text-grey w-full"
              type="text"
              placeholder="Search Customer"
            />
          </div>
        </div>
      </div>
      <Table className="bg-white rounded-tl-2xl  rounded-tr-2xl shadow-2xl">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            {tableHeader.map((header, idx) => (
              <TableHead
                key={idx}
                className={`${
                  idx == 0 && "rounded-l-2xl "
                } whitespace-nowrap text-white  bg-primary ${
                  idx === 6 && "rounded-r-2xl"
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <CustomerTableSkeleton />
          ) : (data?.data?.response?.length ?? 0) > 0 ? (
            data?.data?.response.map((cellData, idx) => (
              <TableRow key={idx} className="bg-transparent">
                <TableCell key={idx}>
                  <div className="flex  items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>
                        {data.type == "individual" &&
                          (cellData as Response)?.firstName &&
                          (cellData as Response)?.surName &&
                          getInitials(
                            `${
                              (cellData as Response)?.firstName +
                              (cellData as Response)?.surName
                            } `
                          )}{" "}
                      </AvatarFallback>
                    </Avatar>
                    {!(cellData as Corporate).registrationNumber ? (
                      <div>
                        <p className="text-md font-medium">{`${
                          (cellData as Response)?.title
                        } ${(cellData as Response)?.firstName} ${(
                          cellData as Response
                        ).surName?.substring(0, 10)}`}</p>
                        <p className="text-xs text-grey">
                          {(cellData as Response).email?.substring(0, 20)}...
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-md font-medium">{`${
                          (cellData as Corporate).companyName
                        }`}</p>
                        <p className="text-xs text-grey">
                          {(cellData as Corporate).companyWebsite}...
                        </p>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {(cellData as Response)?.nin
                    ? (cellData as Response)?.nin
                    : (cellData as Corporate)?.registrationNumber}
                </TableCell>
                <TableCell>{renderCellContent(cellData)}</TableCell>
                <TableCell className="text-grey">
                  {formatDate(cellData.createdAt)}
                </TableCell>
                <TableCell className="text-grey">
                  {formatDate(cellData.createdAt)}
                </TableCell>
                <TableCell className="capitalize">{type}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical className="h-5" />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-fit bg-white h-fit p-0"
                    >
                      <Button
                        className="flex justify-between bg-white gap-3 w-full  text-sm hover:bg-white"
                        onClick={() => {
                          navigate(`/customers/${type}/${cellData._id}`);
                        }}
                      >
                        {" "}
                        <Eye /> View Customer
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <p className="text-center text-grey py-4">No data found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
