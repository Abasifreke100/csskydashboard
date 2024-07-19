import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton"; // Ensure Skeleton component is available
import { ticketTableHeaders } from "../store/data/ticket";

interface TableSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  length,
  children,
}) => {
  const renderTableHeaders = ticketTableHeaders.map((header) => (
    <TableHead key={header} className="h-[18px] py-2">
      <Skeleton className="h-4 w-24" />
    </TableHead>
  ));

  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <TableRow
      key={index}
      className="border group border-b py-2 cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-white border-[#F5F5F7]"
    >
      <TableCell className="py-2">
        <Skeleton className="h-4 w-4" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="flex items-center py-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="ml-2">
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg w-full col-span-3">
      {children}
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="border-none">
            <TableHead className="h-[18px] py-2">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            {renderTableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {renderSkeletonRows}
        </TableBody>
      </Table>
    </div>
  );
};
