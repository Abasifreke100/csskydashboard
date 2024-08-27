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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axiosInstance from "../../api/connectSurfApi";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../models/query";
import { errorToast, successToast } from "../../utils/toast";

interface Tasks {
  _id: string;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
  assignee: string;
  email: string;
  taskId: string;
}

interface TasksTableProps {
  tasks: Tasks[];
  onDeleteSuccess?: () => void; // Optional callback for success handling
  currentPage: number;
  itemsPerPage: number;
}

const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  onDeleteSuccess, // Optional callback for success handling
  currentPage,
  itemsPerPage,
}) => {
  const {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleItemSelection,
  } = useCheckboxSelection(tasks as unknown as Tasks[]);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Access queryClient

  const renderTablesHeaders = taskTableHeaders.map((header) => (
    <TableHead className="h-[18px] py-2" key={header}>
      {header}
    </TableHead>
  ));

  const handleRowClick = (_id: string) => {
    navigate(`/tasks/${_id}`);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);

      // Invalidate queries to refresh task data
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Tasks(currentPage, itemsPerPage),
      });

      if (onDeleteSuccess) {
        successToast({
          title: `Task deleted successfully:`,
          message: "Your new tasks have been successfully loaded.",
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      errorToast({
        title: `Task deleted error:`,
        message: "Your new tasks have been successfully loaded.",
      });
    }
  };

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="border-none py-[9px] hover:bg-transparent">
            <TableHead className="h-[18px] py-2">
              <Checkbox
                id="select-all"
                isChecked={selectAll}
                onChange={handleSelectAllChange}
              />
            </TableHead>
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {tasks.map((task) => {
            const {
              _id,
              title,
              priority,
              status,
              dueDate,
              assignee,
              email,
              taskId,
            } = task;
            return (
              <TableRow
                key={_id}
                className="border group py-2 border-b cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-white border-[#F5F5F7]"
              >
                <TableCell className="whitespace-nowrap py-2">
                  <Checkbox
                    id={_id}
                    isChecked={selectedItems.includes(_id)}
                    onChange={(checkboxId, isChecked) =>
                      handleItemSelection(checkboxId, isChecked)
                    }
                  />
                </TableCell>
                <TableCell className="py-2">
                  <p className="text-sm whitespace-nowrap">
                    {truncateText(taskId ?? " ", 13)}
                  </p>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {truncateText(title ?? " ", 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {priority}
                </TableCell>
                <TableCell>
                  {(status && renderCellContent(status as "Closed")) || "N/A"}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {dueDate}
                </TableCell>
                <TableCell className="flex items-center py-2">
                  <Avatar className="h-10 w-10 mr-1">
                    <AvatarImage src="https://github.com/max-programming.png" />
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-1">
                    <p className="text-sm whitespace-nowrap">
                      {truncateText(assignee ?? "N/A", 13)}
                    </p>
                    <p className="text-xs whitespace-nowrap">
                      {truncateText(email ?? "", 13)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(_id)}>
                        Delete Task
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRowClick(_id)}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
