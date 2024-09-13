import React, { useEffect } from "react";
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
import { getInitials } from "../../utils/getInitials";
import { renderCellContent } from "../store/data/task";
import { Ticket } from "../../hooks/useFetchTickets";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination"; // Assuming these are UI components for pagination
import { usePagination } from "../../utils/pagination/usePagination";

interface TicketsTableProps {
  setIsModalVisible: (visible: boolean) => void;
  setRowId: (rowId: string) => void;
  tickets: Ticket[];
  filter: string
}

const TicketsTable: React.FC<TicketsTableProps> = ({
  setIsModalVisible,
  setRowId,
  tickets,
  filter
}) => {
  // Pagination logic using the custom hook
  const itemsPerPage = 10;
  const {
    data: paginatedTickets,
    totalPages,
    page,
    onNextPage,
    onPrevPage,
    setPage,
  } = usePagination(tickets, itemsPerPage); // 10 items per page

  const {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleItemSelection,
  } = useCheckboxSelection(paginatedTickets);

  const renderTablesHeaders = ticketTableHeaders.map((header) => (
    <TableHead className="h-[18px] py-2 whitespace-nowrap" key={header}>
      {header}
    </TableHead>
  ));

  const handleRowClick = (rowId: string) => {
    setIsModalVisible(true);
    setRowId(rowId);
  };

  const isNextDisabled = page >= totalPages - 1;

  useEffect(() => {
    setPage(0)
  },[filter])

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-none py-[9px] hover:bg-transparent whitespace-nowrap">
              <TableHead className="h-[18px] py-2 whitespace-nowrap">
                <Checkbox
                  id="select-all"
                  isChecked={selectAll}
                  onChange={() => handleSelectAllChange()}
                />
              </TableHead>
              {renderTablesHeaders}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white hover:bg-white">
            {paginatedTickets.map((ticket) => {
              const { id, subject, priority, status, created, assigned_to } =
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
                  <TableCell className="py-2">
                    <p className="text-sm whitespace-nowrap">
                      {truncateText(id, 13)}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-2">
                    {truncateText(subject, 20)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-2">
                    {(priority && renderCellContent(priority as "Closed")) ||
                      "N/A"}
                  </TableCell>
                  <TableCell className={statusTextColor}>{status}</TableCell>
                  <TableCell className="whitespace-nowrap py-2">
                    {created}
                  </TableCell>
                  <TableCell className="flex items-center py-2">
                    <Avatar className="h-10 w-10 mr-1">
                      <AvatarImage src="https://github.com/max-programming.png" />
                      <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                        {getInitials(assigned_to ?? "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-1">
                      <p className="text-sm whitespace-nowrap">
                        {truncateText(assigned_to ?? "", 13)}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination UI */}
      <Pagination className="h-fit flex mt-3 justify-end">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={onPrevPage}
              aria-disabled={page === 0}
              tabIndex={page === 0 ? -1 : undefined}
              className={`
              text-sm 
              ${page == 0 ? "pointer-events-none opacity-50" : ""}
            `}
            />
          </PaginationItem>

          {/* Show the first page */}
          {totalPages > 1 && (
            <PaginationItem
              className={
                page === 0
                  ? "bg-primary h-6 flex items-center rounded-md w-6 hover:bg-primary text-white"
                  : "hover:bg-primary h-6 w-6 rounded-md"
              }
            >
              <PaginationLink
                href="#"
                className="hover:bg-primary h-6 w-6 hover:text-white rounded-md"
                onClick={() => setPage(0)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Show ellipsis if there are pages between the first page and the current page */}
          {page > 4 && totalPages > 6 && <span className="ellipsis">...</span>}

          {/* Show pages around the current page */}
          {[...Array(totalPages)].map((_, index) => {
            if (index > 0 && index < totalPages - 1) {
              if (index === page || (index >= page - 2 && index <= page + 2)) {
                return (
                  <PaginationItem
                    key={index}
                    className={
                      index === page
                        ? "bg-primary h-6 flex items-center rounded-md w-6 hover:bg-primary text-white"
                        : "hover:bg-primary h-6 w-6 rounded-md"
                    }
                  >
                    <PaginationLink
                      className="hover:bg-primary h-6 w-6 hover:text-white rounded-md"
                      href="#"
                      onClick={() => setPage(index)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            }
            return null;
          })}

          {page < totalPages - 5 && totalPages > 6 && (
            <span className="ellipsis">...</span>
          )}

          {/* Show the last page */}
          {totalPages > 1 && (
            <PaginationItem
              className={
                page === totalPages - 1
                  ? "bg-primary h-6 flex items-center rounded-md w-6 hover:bg-primary text-white"
                  : "hover:bg-primary  h-6 w-6 rounded-md"
              }
            >
              <PaginationLink
                className="hover:bg-primary h-6 w-6 hover:text-white rounded-md"
                href="#"
                onClick={() => setPage(totalPages - 1)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => !isNextDisabled && onNextPage()}
              aria-disabled={isNextDisabled}
              tabIndex={isNextDisabled ? -1 : undefined}
              className={`
              text-sm
              ${isNextDisabled ? "pointer-events-none opacity-50" : ""}
            `}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TicketsTable;
