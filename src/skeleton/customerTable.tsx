import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
} from "../components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import {
  TableRow,
  TableCell,
} from "../components/ui/table";

const CustomerTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <TableRow key={idx} className="bg-transparent">
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>
                  <div className="bg-gray-300 rounded-full w-10 h-10  shimmer   " />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md font-medium">
                  <div className="bg-gray-300 rounded-md h-[10px] shimmer w-24 " />
                </p>
                <p className="text-xs text-grey mt-1">
                  <div className="bg-gray-300 rounded h-2 w-20 shimmer" />
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="bg-gray-300 rounded-md shimmer h-3 w-28 " />
          </TableCell>
          <TableCell>
            <div className="bg-gray-300 rounded h-4 w-20 shimmer" />
          </TableCell>
          <TableCell>
            <div className="bg-gray-300 rounded h-4 w-20 shimmer" />
          </TableCell>
          <TableCell>
            <div className="bg-gray-300 rounded h-4 w-20 shimmer" />
          </TableCell>
          <TableCell className="capitalize">
            <div className="bg-gray-300 rounded h-4 w-12 shimmer" />
          </TableCell>
          <TableCell>
            <Popover >
              <PopoverTrigger>
              <EllipsisVertical className="h-5" />
              </PopoverTrigger>
            </Popover>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default CustomerTableSkeleton;
