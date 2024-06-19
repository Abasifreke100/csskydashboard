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
    if (!isLoading && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 9;
    const halfMaxPages = Math.floor(maxPageNumbers / 2);

    let startPage: number, endPage: number;
    if (totalPages <= maxPageNumbers) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfMaxPages) {
      startPage = 1;
      endPage = maxPageNumbers;
    } else if (currentPage + halfMaxPages >= totalPages) {
      startPage = totalPages - maxPageNumbers + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfMaxPages;
      endPage = currentPage + halfMaxPages;
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key={1} className="hover:bg-secondary rounded-md" >
          <PaginationLink className="hover:bg-secondary rounded-md"  href="#" onClick={() => handlePageClick(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(<PaginationItem key="start-ellipsis"><span className="px-2">...</span></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i} className={i === currentPage ? "bg-primary h-6 flex items-center rounded-md w-6 hover:bg-primary text-white" : "hover:bg-primary rounded-md"}>
          <PaginationLink href="#" className="hover:bg-primary h-6 w-6 hover:text-white rounded-md"  onClick={() => handlePageClick(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PaginationItem key="end-ellipsis"><span className="px-2">...</span></PaginationItem>);
      }
      pageNumbers.push(
        <PaginationItem  className="hover:bg-secondary rounded-md"  key={totalPages}>
          <PaginationLink className="hover:bg-secondary rounded-md"  href="#" onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  const lastItemIndex = currentPage * itemsPerPage;

  return (
    <Pagination className="h-fit flex mt-3 justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={`
              text-sm 
              ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            `}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
            aria-disabled={lastItemIndex >= totalItems}
            tabIndex={lastItemIndex >= totalItems ? -1 : undefined}
            className={`
              text-sm
              ${lastItemIndex >= totalItems ? "pointer-events-none opacity-50" : ""}
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPaginationContent;
