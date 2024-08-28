import { useState } from "react";
import CustomPaginationContent from "../../utils/pagination";
import AdminTable from "../../components/admin/AdminTable";
import { useFetchUsers } from "../../hooks/useFetchAdmin";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { AdminTableSkeleton } from "../../components/admin/AdminTableSkeleton";
import AdminTableEmptyState from "../../components/admin/AdminTableEmptyState";

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: users, isLoading } = useFetchUsers(currentPage, itemsPerPage);


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<AdminTableSkeleton length={10} />}
        emptyState={<AdminTableEmptyState />}
        data={users?.data?.response.length}
      >
        <>
          <AdminTable users={users?.data?.response} />
          <CustomPaginationContent
            currentPage={currentPage}
            totalItems={users?.data?.pagination?.total || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default AdminPage;
