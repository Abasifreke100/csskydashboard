import { useState } from "react";
import Header from "../../components/global/header";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TicketsTable from "../../components/tickets/TicketTable";
import TicketTableEmptyState from "../../components/tickets/TicketTableEmptyState";
import { TableSkeleton } from "../../components/tickets/TicketTableSkeleton";
import TicketDetailsModal from "../../components/tickets/TicketDetailsModal";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { errorToast, successToast } from "../../utils/toast";
import axiosInstance from "../../api/connectSurfApi";
import { useFetchTickets } from "../../hooks/useFetchTickets";
import { useSearchParams } from "react-router-dom";
import { useFetchUserIds } from "../../hooks/useAllUserIds";

const TicketPage = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [message, setMessage] = useState("");
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);
  // const { data: ticket, isLoading } = useFetchTicket();
  const { data: userIds, isLoading:isLoadingIds } = useFetchUserIds();
  const { tickets, isLoading } = useFetchTickets({  userIds: userIds?.data ?? [],});

  console.log("tickets pagessss", tickets);

  const handleSaveComment = async () => {
    try {
      const response = await axiosInstance.post(`/comment`, {
        taskId: rowId,
        message,
      });
      if (response.data.success) {
        setMessage("");
        setIsAddingComment(false);
        setShouldRefetchComments(true);
        successToast({
          title: "Save Comment Success",
          message: "Comment saved successfully.",
        });
      } else {
        errorToast({
          title: "Save Comment Error",
          message: response.data.message || "Failed to save comment.",
        });
      }
    } catch (err) {
      errorToast({
        title: "Save Comment Error",
        message: "Failed to save comment.",
      });
      console.error(err);
    }
  };

  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

    const filteredTickets =
      filter === "all"
        ? tickets // If filter is "all", show all tickets
        : tickets.filter(
            (ticket) => ticket.status.toLowerCase() === filter.toLowerCase()
          );

  return (
    <div className=" mb-16 lg:mb-0">
      <Header title="Tickets" />
      <div className="overflow-hidden flex-col lg:flex-row w-full  mt-6 lg:mt-0 lg:justify-end flex lg:items-center flex-nowrap gap-2">
        <div>
          <div className="bg-white flex gap-0.5 rounded-lg items-center px-2">
            <Search size={15} />
            <Input
              className="outline-none flex-1 w-[450px]"
              placeholder="Search"
            />
          </div>
          {/* space for month */}
        </div>
      </div>
      <FetchLoadingAndEmptyState
        isLoading={isLoadingIds || isLoading}
        numberOfSkeleton={1}
        skeleton={<TableSkeleton length={5} />}
        emptyState={<TicketTableEmptyState />}
        data={filteredTickets.length}
      >
        <TicketsTable
          setRowId={setRowId}
          setIsModalVisible={setIsModalVisible}
          tickets={filteredTickets}
          filter={filter}
        />
      </FetchLoadingAndEmptyState>
      <TicketDetailsModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowId={rowId}
        isAddingComment={isAddingComment}
        message={message}
        setIsAddingComment={setIsAddingComment}
        setMessage={setMessage}
        handleSaveComment={handleSaveComment}
        handleAddCommentClick={handleAddCommentClick}
        shouldRefetchComments={shouldRefetchComments}
        setShouldRefetchComments={setShouldRefetchComments}
        tickets={filteredTickets}
      />
    </div>
  );
};

export default TicketPage;
