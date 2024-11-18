import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { plansTableHeaders } from "../store/data/plans";

interface PlansTableSkeletonProps {
  length: number;
}

export const PlansTableSkeleton: React.FC<PlansTableSkeletonProps> = ({
  length,
}) => {
  const renderTableHeaders = (
    <TableRow className="border-none py-[9px] hover:bg-transparent">
      {plansTableHeaders.map((header) => (
        <TableHead key={header} className="h-[18px] py-2 whitespace-nowrap">
          <Skeleton className="h-4 w-24" />
        </TableHead>
      ))}
    </TableRow>
  );

  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <TableRow
      key={index}
      className="border group border-b py-2 cursor-pointer transition-colors hover:bg-muted/50 bg-white border-[#F5F5F7]"
    >
      <TableCell className="py-2 flex gap-2 items-center">
       
          <Skeleton className="h-3 w-20 mt-1" />
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
        <Skeleton className="h-6 w-24" />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg w-full col-span-3">
      <Table>
        <TableHeader className="bg-gray-100">{renderTableHeaders}</TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {renderSkeletonRows}
        </TableBody>
      </Table>
    </div>
  );
};
