import { Wifi } from "lucide-react";
import Header from "../../components/global/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TasksTable from "../../components/task/TasksTable";
import { TableSkeleton } from "../../components/tickets/TicketTableSkeleton";
import { sampleTaskCardsData } from "../../components/store/data/task";
import TasksTableEmptyState from "../../components/task/TaskTableEmptyState";

const Tasks = () => {
  const isLoading = false; // Replace with actual loading state
  const navigate = useNavigate();

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    rowId: string
  ) => {
    const checkboxClicked = (event.target as HTMLElement).closest(
      'input[type="checkbox"]'
    );

    if (!checkboxClicked) {
      navigate(`/tasks/${rowId}`);
    }
  };

  return (
    <div className="min-h-screen pb-5">
      <Header title="Task Overview" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        {sampleTaskCardsData.map((card) => (
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
        <Header title="Task List" />
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          skeleton={<TableSkeleton length={5} />}
          emptyState={<TasksTableEmptyState />}
          data={1}
        >
          <TasksTable handleRowClick={handleRowClick} />
        </FetchLoadingAndEmptyState>
      </div>
    </div>
  );
};

export default Tasks;
