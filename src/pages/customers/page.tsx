import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { EllipsisVertical, Eye, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { AvatarData, CellData, EmptyCell, TextData } from "../../types";
import { rowData, tableHeader } from "../../constants";
import { Chip } from "../../utils/tab-chip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const tabs = ["All", "Verified", "Pending", "Failed"];

const getCellClassName = (cellData: CellData): string => {
  let className = "";
  if (isAvatarData(cellData)) {
    className = "font-medium";
  } else if (isTextData(cellData) && cellData.align === "right") {
    className = "text-right";
  }
  return className;
};

const renderCellContent = (cellData: CellData): JSX.Element => {
  let badgeBgColor = "";

  switch (cellData.data) {
    case "Verified":
      badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
      break;
    case "Pending":
      badgeBgColor = "bg-secondary hover:bg-secondary text-primary";
      break;
    case "Failed":
      badgeBgColor = "bg-lightRed hover:bg-lightRed text-deepRed";
      break;
    default:
      badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
  }

  if (isAvatarData(cellData)) {
    const { src, alt, fallback, name, email } = cellData.data as {
      src: string;
      alt: string;
      fallback: string;
      name: string;
      email: string;
    };
    return (
      <div className="flex  items-center gap-3">
        <Avatar>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-md font-medium">{name}</p>
          <p className="text-xs text-grey">{email}</p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {isTextData(cellData) ? (
          <p className="text-grey text-[13px">{cellData.data}</p>
        ) : isEmptyData(cellData) ? (
          <>
            <Badge className={` ${badgeBgColor}`}>{cellData.data}</Badge>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
};

const isAvatarData = (data: CellData): data is AvatarData => {
  return (
    (data as AvatarData).data.src !== undefined &&
    (data as CellData).type === "avatar"
  );
};

const isTextData = (data: CellData): data is TextData => {
  return (data as TextData).type === "text";
};

const isEmptyData = (data: CellData): data is EmptyCell => {
  return (data as EmptyCell).type === "empty";
};

const CustomersPage = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <p className="text-xl font-semibold">Customers</p>
      <div className="flex items-center w-full gap-3 ">
      <div className="overflow-hidden">
      <div className=" py-10 whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
          {tabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
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
      <Table className="bg-white rounded-tl-2xl rounded-tr-2xl shadow-2xl">
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
          <TableRow className="bg-transparent">
            {rowData.map((cellData, idx) => (
              <TableCell key={idx} className={getCellClassName(cellData)}>
                {renderCellContent(cellData)}
              </TableCell>
            ))}
            <TableCell>
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical className="h-5" />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit bg-white h-fit p-0">
                  <Button
                    className="flex justify-between bg-white gap-3 w-full  text-sm hover:bg-white"
                    onClick={() => {
                      navigate(`/customers/1`);
                    }}
                  >
                    {" "}
                    <Eye /> View Customer
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersPage;
