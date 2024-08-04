import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { taskTableHeaders } from "../store/data/task";
  
  const TasksTableEmptyState = () => {
    const renderTablesHeaders = taskTableHeaders.map((header) => (
      <TableHead key={header}>{header}</TableHead>
    ));
    return (
      <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg w-full col-span-3">
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableCell></TableCell>
              {renderTablesHeaders}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white hover:bg-white">
            <TableRow className="border-none text-gray-500">
              <TableCell colSpan={7} className="text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default TasksTableEmptyState;
  