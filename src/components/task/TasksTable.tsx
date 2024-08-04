import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { truncateText } from "../../utils/text";
import useCheckboxSelection from "../../hooks/useCheckboxSelection";
import { Checkbox } from "../checkbox";
import { renderCellContent, taskTableHeaders } from "../store/data/task";

interface Tasks {
  id: string;
  subject: string;
  priority: string;
  status: string;
  createdOn: string;
  assignee: string;
  email: string;
}

interface TasksTableProps {
    handleRowClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, rowId: string) => void;
}

const TasksTable: React.FC<TasksTableProps> = ({
  handleRowClick: handleRow,
}) => {
  const sampleData: Tasks[] = [
    {
      id: "TASK123456",
      subject: "Update Docs",
      priority: "High",
      status: "Closed",
      createdOn: "2024-06-20",
      assignee: "John Doe",
      email: "johndoe@gmail.com",
    },
  ];

  const {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleItemSelection,
  } = useCheckboxSelection(sampleData);

  const renderTablesHeaders = taskTableHeaders.map((header) => (
    <TableHead className="h-[18px] py-2" key={header}>
      {header}
    </TableHead>
  ));

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    rowId: string
  ) => {
    handleRow(e, rowId);
  };

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto  shadow-md border rounded-lg">
      <Table>
        <TableHeader className="">
          <TableRow className="border-none py-[9px] hover:bg-transparent">
            <TableHead className="h-[18px] py-2">
              <Checkbox
                id="select-all"
                isChecked={selectAll}
                onChange={handleSelectAllChange} // This should be adjusted if handleSelectAllChange does not expect an id and isChecked
              />
            </TableHead>
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {sampleData.map((Tasks) => {
            const { id, subject, priority, status, createdOn, assignee, email } =
              Tasks;

            return (
              <TableRow
                key={id}
                onClick={(e) => handleRowClick(e, id)}
                className="border group py-2 border-b cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-white border-[#F5F5F7]"
              >
                <TableCell className="whitespace-nowrap py-2">
                  <Checkbox
                    id={id}
                    isChecked={selectedItems.includes(id)}
                    onChange={(checkboxId, isChecked) =>
                      handleItemSelection(checkboxId, isChecked)
                    }
                  />
                </TableCell>
                <TableCell className="py-2">
                  <p className="text-sm whitespace-nowrap">
                    {truncateText(id, 13)}
                  </p>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 ">
                  {truncateText(subject, 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {priority}
                </TableCell>
                <TableCell >
                {(status &&
                      renderCellContent(status as "Closed")) ||
                      "N/A"}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {createdOn}
                </TableCell>
                <TableCell className="flex items-center py-2">
                  <Avatar className=" h-10 w-10 mr-1">
                    <AvatarImage src="https://github.com/max-programming.png" />
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className=" ml-1">
                    <p className="text-sm whitespace-nowrap">
                      {truncateText(assignee, 13)}
                    </p>
                    <p className="text-xs  whitespace-nowrap">
                      {truncateText(email, 13)}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
