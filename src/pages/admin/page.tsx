import { useState } from "react";
import CustomPaginationContent from "../../utils/pagination";
import AdminTable from "../../components/admin/AdminTable";
import { useFetchUsers } from "../../hooks/useFetchAdmin";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { AdminTableSkeleton } from "../../components/admin/AdminTableSkeleton";
import AdminTableEmptyState from "../../components/admin/AdminTableEmptyState";
import TasksTableEmptyState from "../../components/task/TaskTableEmptyState";
import { TableSkeleton } from "../../components/tickets/TicketTableSkeleton";
import TasksTable from "../../components/task/TasksTable";
import { useTasks } from "../../hooks/useTasks";

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: users, isLoading } = useFetchUsers(currentPage, itemsPerPage);
  const {
    data,
    isLoading: taskLoading,
    isError,
    error,
  } = useTasks(currentPage, itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <p className="font-medium">Staff</p>
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
      <p className="font-medium">Task List</p>
      <FetchLoadingAndEmptyState
        isLoading={taskLoading}
        numberOfSkeleton={1}
        skeleton={<TableSkeleton length={5} />}
        emptyState={<TasksTableEmptyState />}
        data={data?.data?.response.length}
      >
        {isError ? (
          <div className="text-red-500">
            Failed to load tasks: {error?.message}
          </div>
        ) : (
          <>
            <TasksTable
              tasks={data?.data?.response}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <CustomPaginationContent
              currentPage={currentPage}
              totalItems={data?.data?.pagination?.total || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default AdminPage;
