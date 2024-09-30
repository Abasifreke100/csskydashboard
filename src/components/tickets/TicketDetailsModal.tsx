import { DefaultDialogProps } from "../../models/shared";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getStatusColor } from "../../utils/status";
import { FetchLoadingAndEmptyState } from "../shared/FetchLoadingAndEmptyState";
import { TicketsCommentSkeleton } from "../task/comments/CommentListSkeleton";
import { renderCellContent } from "../store/data/task";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "../../utils/getInitials";
import { truncateText, formatTier } from "../../utils/text";
import { formatTimeAgo } from "../../utils/date";
import { Badge } from "../ui/badge";
import { Key } from "react";
import CommentsSection from "../task/comments/CommentsSection";
import { useFetchSingleTicket } from "../../hooks/useFetchTickets";
import { CommentsHeader } from "../task/comments/CommentsList";
import { useNavigate } from "react-router-dom";
import TicketsDetailSkeleton from "./TicketsDetailSkeleton";

interface TicketDetailsModalProps extends DefaultDialogProps {
  rowId: string | null;
}

const TicketDetailsModal = ({
  isOpen,
  onClose,
  rowId,
}: TicketDetailsModalProps) => {
  const { data, isLoading, isError, error } = useFetchSingleTicket(rowId);
  const navigate = useNavigate();
  const onCloseModal = () => {
    onClose();
  };

  const statusTextColor = getStatusColor(
    data?.ticket?.ticket_details?.status ?? ""
  );

  const handleSeeAllTaskComments = () => {
    navigate(`/tasks/${data?.task?._id}`);
  };

  const createdDate = data?.ticket?.ticket_details?.created 

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby="ticket-details-description"
        className="font-poppins rounded-xl max-w-[380px] max-h-[500px] overflow-y-auto md:max-w-[450px] lg:max-w-md"
      >
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          skeleton={<TicketsDetailSkeleton />}
          emptyState={<div>empty state</div>}
          data={data ? 1 : 0}
        >
          <DialogHeader>
            <DialogTitle className="text-sm">Ticket ID #{rowId}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-3 text-xs">
            <p className="font-medium text-gray-400">
              Subject:{" "}
              <span className="text-black">
                {data?.ticket?.ticket_details?.type}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Description: <br />
              <span className="text-black text-xs">
                {data?.ticket?.ticket_details?.subject}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Priority:{" "}
              <span className="text-black">
                {data?.ticket?.ticket_details?.priority &&
                  renderCellContent(
                    data?.ticket?.ticket_details?.priority as "low"
                  )}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Status:{" "}
              <span className={`${statusTextColor}`}>
                {data?.ticket?.ticket_details?.status}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Created On:{" "}
              <span className="text-black">
                {createdDate
                  ? new Date(createdDate).toLocaleDateString()
                  : "Date not available"}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Due Date:{" "}
              <span className="text-black">
                {/* TODO: Checks on ticket details */}
                {/* Other code logic here */}
                {/* {data?.ticket?.ticket_details?.created} */}
              </span>
            </p>
            <p className="font-medium text-gray-400">
              Assignee:{" "}
              <span className="text-black">
                {data?.ticket?.ticket_details?.assigned_to}
              </span>
            </p>
            {data?.task.assignee && (
              <div className="flex flex-col items-start w-full">
                <p className="font-medium text-gray-400">Task Assignee</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Avatar className="">
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      {getInitials(
                        data?.task?.assignee?.firstName +
                          data?.task?.assignee?.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-1 flex-1">
                    <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-0.5">
                          <p className="text-xs text-black">
                            {data?.task?.assignee?.firstName +
                              " " +
                              data?.task?.assignee?.lastName}
                          </p>
                          <Badge className="h-4 px-1 text-xs bg-[#FFFAEF] hover:bg-[#FFFAEF] whitespace-nowrap hover:text-primary text-[#FF7F00]">
                            {formatTier(
                              data?.task?.assignee?.tier ?? "Unknown"
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<TicketsCommentSkeleton length={1} />}
            emptyState={<div>empty state</div>}
            data={data?.ticket?.ticket_conversation?.length}
          >
            {isError ? (
              <p className="text-red-500">Error: {error?.message}</p>
            ) : (
              <div>
                {/* Ticket Conversation Section */}
                {data?.ticket?.ticket_conversation?.length &&
                  data.ticket.ticket_conversation.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-sm text-gray-400">
                        Conversation
                      </p>
                      <div className="mt-4 max-h-[100px] overflow-y-auto">
                        {data?.ticket.ticket_conversation.map(
                          (
                            message: {
                              sender_name: string;
                              show_to_user: string;
                              created: string | number | Date;
                              ticket_message: string;
                            },
                            index: Key | null | undefined
                          ) => (
                            <div
                              key={index}
                              className="flex items-start w-full justify-between mt-2"
                            >
                              <div className="flex items-start w-full">
                                <Avatar className="mr-1">
                                  <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                                    {getInitials(message.sender_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-1 flex-1">
                                  <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                                    <div className="flex items-start justify-between">
                                      <div className="flex gap-0.5">
                                        <p className="text-xs text-black">
                                          {truncateText(
                                            message.sender_name,
                                            13
                                          )}
                                        </p>
                                        <Badge className="h-4 px-1 text-xs bg-[#FFFAEF] hover:bg-[#FFFAEF] whitespace-nowrap hover:text-primary text-[#FF7F00]">
                                          {formatTier(
                                            message.show_to_user ?? "Unknown"
                                          )}
                                        </Badge>
                                      </div>
                                      <p className="text-[10px] font-medium">
                                        {formatTimeAgo(message.created)}
                                      </p>
                                    </div>
                                    <p
                                      className="text-xs mt-0.5 w-full leading-tight whitespace-normal"
                                      dangerouslySetInnerHTML={{
                                        __html: message.ticket_message,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      {!data?.task?._id && (
                        <CommentsHeader
                          className="mt-4 pb-2"
                          title="Task Comments"
                        />
                      )}

                      <CommentsSection taskID={data?.task?._id}>
                        <CommentsHeader
                          className="mt-5 pb-2"
                          title="Task Comments"
                          onSeeAllClick={handleSeeAllTaskComments}
                        />
                      </CommentsSection>
                    </div>
                  )}
              </div>
            )}
          </FetchLoadingAndEmptyState>
        </FetchLoadingAndEmptyState>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
