import { useMemo, useState } from "react";
import { Wifi } from "lucide-react";
import Header from "../../components/global/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TasksTable from "../../components/task/TasksTable";
import { TableSkeleton } from "../../components/tickets/TicketTableSkeleton";
import TasksTableEmptyState from "../../components/task/TaskTableEmptyState";
import CustomPaginationContent from "../../utils/pagination";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import NewTasksForm from "../../components/task/NewTasksForm";
import { useTasks } from "../../hooks/useTasks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface CardData {
  title: string;
  value: number;
}

const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userTier = useSelector((state: RootState) => state.auth.user?.tier);
  const { data, isLoading, isError, error } = useTasks(
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // Dynamically generate the card data
  const cardData: CardData[] = useMemo(() => {
    const totalTasks = data?.data?.response.length || 0;
    const openTasks =
      data?.data?.response?.filter(
        (task: { status: string }) =>
          task.status === "open" || task.status == "pending"
      ).length || 0;
    const inProgressTasks =
      data?.data?.response?.filter(
        (task: { status: string }) =>
          task.status === "in progress" || task.status === "progress"
      ).length || 0;
    const closedTasks =
      data?.data?.response?.filter(
        (task: { status: string }) =>
          task.status === "closed" || task.status === "completed"
      ).length || 0;

    return [
      {
        title: "Total Tasks",
        value: totalTasks,
      },
      {
        title: "Open Tasks",
        value: openTasks,
      },
      {
        title: "In Progress",
        value: inProgressTasks,
      },
      {
        title: "Closed Tasks",
        value: closedTasks,
      },
    ];
  }, [data]);

  const canCreateTask = userTier === "tier-3" || userTier === "tier-4";

  return (
    <div className="min-h-screen pb-5">
      <Header title="Task Overview" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        {cardData.map((card) => (
          <Card
            key={card.title}
            className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-md">
                <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
                  <Wifi />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-xl">{card.value}</p>
              <p className="text-[#000000E5] text-xs font-poppins">
                {card.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p>Task List</p>
          {canCreateTask && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[530px] w-[340px] rounded-md px-0 md:px-2 md:w-[400px] overflow-y-auto">
                <DialogHeader>
                  {/* <DialogTitle></DialogTitle> */}
                  <DialogDescription>
                    <NewTasksForm
                      className="grid md:grid-cols-1"
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      onClose={handleDialogClose} // Pass close handler
                      cardClassName="border border-none shadow-none mb-0"
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
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
    </div>
  );
};

export default Tasks;
