import { Plus } from "lucide-react";
import { plansTableHeaders } from "../store/data/plans";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const PlansTable = () => {
  const renderTableHeaders = (
    <TableRow className="border-none py-[9px] hover:bg-transparent">
      {plansTableHeaders.map((header) => (
        <TableHead className="h-[18px] py-2 whitespace-nowrap" key={header}>
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="relative mt-8 lg:mt-5 overflow-x-auto shadow-md border rounded-lg">
      <Table>
        <TableHeader>{renderTableHeaders}</TableHeader>
        <TableBody className="bg-white hover:bg-white">
          <TableRow className="border group py-2 border-b cursor-pointer text-gray-400 transition-colors hover:bg-muted/50">
            <TableCell className="whitespace-nowrap py-2">
              200GB DATA PLAN
            </TableCell>
            <TableCell className="whitespace-nowrap py-2">
              Special Plan_on demand
            </TableCell>
            <TableCell className="whitespace-nowrap py-2">3 </TableCell>
            <TableCell className="whitespace-nowrap py-2">3 </TableCell>
            <TableCell className="whitespace-nowrap py-2">
              <Button className="bg-gray-100 hover:bg-gray-100 text-gray-400 rounded-2xl">
                <Plus /> Add User
               </Button>{" "}
            </TableCell>
          </TableRow>{" "} 
          <TableRow className="border bg-gray-200 text-gray-400 group py-2.5 border-b cursor-pointer font-semibold transition-colors hover:bg-gray-200">
            <TableCell className="whitespace-nowrap py-2.5">
Total            </TableCell>
            <TableCell className="whitespace-nowrap py-2.5">
            </TableCell>
            <TableCell className="whitespace-nowrap py-2.5">553 </TableCell>
            <TableCell className="whitespace-nowrap py-2.5">313 </TableCell>
            <TableCell className="whitespace-nowrap py-2.5">
              
            </TableCell>
          </TableRow>{" "}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansTable;
