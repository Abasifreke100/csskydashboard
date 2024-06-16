import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationLink,
} from "../components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const CustomPaginationContent: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (!isLoading) {
      onPageChange(page);
    }
  };

  const lastItemIndex = currentPage * itemsPerPage;

  return (
    <Pagination className="h-fit flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, idx) => (
        <PaginationItem key={idx}>
          <PaginationLink
            href="#"
            onClick={() => handlePageClick(idx + 1)}
            // className={currentPage === idx + 1 ? "bg-primary text-white" : ""}
          >
            {idx + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
            aria-disabled={lastItemIndex >= totalItems}
            tabIndex={lastItemIndex >= totalItems ? -1 : undefined}
            className={
              lastItemIndex >= totalItems
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPaginationContent;
