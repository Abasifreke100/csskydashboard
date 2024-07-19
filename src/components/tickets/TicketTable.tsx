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
import { getStatusColor } from "../../utils/status";
import { truncateText } from "../../utils/text";
import { ticketTableHeaders } from "../store/data/ticket";
import useCheckboxSelection from "../../hooks/useCheckboxSelection";
import { Checkbox } from "../checkbox";

interface Ticket {
  id: string;
  subject: string;
  priority: string;
  status: string;
  createdOn: string;
  assignee: string;
}

interface TicketsTableProps {
  setIsModalVisible: (visible: boolean) => void;
  setRowId: (rowId: string) => void;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ setIsModalVisible , setRowId }) => {
  const sampleData: Ticket[] = [
    {
      id: "TICK123456",
      subject: "Issue with login",
      priority: "High",
      status: "Pending",
      createdOn: "2-October-2023",
      assignee: "John Doe",
    },
  ];

  const {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleItemSelection,
  } = useCheckboxSelection(sampleData);

  const renderTablesHeaders = ticketTableHeaders.map((header) => (
    <TableHead className="h-[18px] py-2" key={header}>{header}</TableHead>
  ));

  const handleRowClick = (rowId: string) => {
    setIsModalVisible(true);
    setRowId(rowId);
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
          {sampleData.map((ticket) => {
            const { id, subject, priority, status, createdOn, assignee } =
              ticket;
            const statusTextColor = getStatusColor(status);

            return (
              <TableRow
                key={id}
                onClick={() => handleRowClick(id)}
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
                <TableCell className="flex items-center py-2">
                  <div className="ml-1">
                    <p className="text-sm whitespace-nowrap">
                      {truncateText(id, 13)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {truncateText(subject, 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">{priority}</TableCell>
                <TableCell className={statusTextColor}>{status}</TableCell>
                <TableCell className="whitespace-nowrap py-2">{createdOn}</TableCell>
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

export default TicketsTable;
