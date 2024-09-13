import { DefaultDialogProps } from "../../models/shared";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getStatusColor } from "../../utils/status";
import CustomButton from "../shared/CustomButton";
import { CheckCircle, Plus, Save } from "lucide-react";
import CommentsSection from "../task/comments/CommentsSection";
import { renderCellContent } from "../store/data/task";
import { Ticket } from "../../hooks/useFetchTickets";

interface TicketDetailsModalProps extends DefaultDialogProps {
  rowId: string | null;
  isAddingComment: boolean;
  message: string;
  setIsAddingComment: (value: boolean) => void;
  setMessage: (value: string) => void;
  handleSaveComment: () => void;
  handleAddCommentClick: () => void;
  shouldRefetchComments: boolean;
  setShouldRefetchComments: (value: boolean) => void;
  tickets: Ticket[];
}

const TicketDetailsModal = ({
  isOpen,
  onClose,
  rowId,
  isAddingComment,
  message,
  setIsAddingComment,
  setMessage,
  handleSaveComment,
  handleAddCommentClick,
  shouldRefetchComments,
  setShouldRefetchComments,
  tickets
}: TicketDetailsModalProps) => {
  const onCloseModal = () => {
    onClose();
  };

  const ticket = tickets.find((item) => item?.id === rowId);

  if (!ticket) {
    return null;
  }

  const statusTextColor = getStatusColor(ticket?.status);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby="ticket-details-description"
        className="font-poppins rounded-xl max-w-[380px] md:max-w-[450px] lg:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-sm">
            Ticket ID #{ticket?.id}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3 text-xs">
          <p className="font-medium text-gray-400 ">
            Subject:{" "}
            <span className="text-black ">{ticket?.group_name}</span>
          </p>
          <p className="font-medium  text-gray-400">
            Description: <br />
            <span className="text-black text-xs">{ticket?.subject}</span>
          </p>
          <p className="font-medium text-gray-400">
            Priority:{" "}
            <span className="text-black">
              {ticket?.priority &&
                renderCellContent(ticket?.priority as "low")}
            </span>
          </p>
          <p className="font-medium text-gray-400">
            Status:{" "}
            <span className={`${statusTextColor}`}>
              {ticket?.status}
            </span>
          </p>
          <p className="font-medium text-gray-400">
            Created On:{" "}
            <span className="text-black">
              {new Date(ticket?.created).toLocaleDateString()}
            </span>
          </p>
          <p className="font-medium text-gray-400">
            Due Date:{" "}
            <span className="text-black">
              {ticket?.due}
            </span>
          </p>
          <p className="font-medium text-gray-400">
            Assignee:{" "}
            <span className="text-black">{ticket?.assigned_to}</span>
          </p>
          <p className="font-medium text-gray-400">Attachments:</p>
        </div>
        <div className="mt-3 max-h-[150px] border-t overflow-y-auto py-2">
          <div className="flex justify-between items-center text-sm">
            <p className="font-medium text-gray-400 ">Comments:</p>
            <p className="font-medium  text-black cursor-pointer">
              See all &gt;
            </p>
          </div>
          <CommentsSection
            taskID={ticket?.id}
            refetchComments={shouldRefetchComments}
            onRefetchComplete={() => setShouldRefetchComments(false)}
          />
          {/* buttons add comment , update status , save changes */}
          {isAddingComment && (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={message}
                onChange={(e) => {
                  e.preventDefault();
                  setMessage(e.target.value);
                }}
                placeholder="Add your comment"
                className="w-full mt-4 text-sm outline-none p-2 border rounded-md"
              />
              <div className="flex gap-1.5">
                <CustomButton
                  label="Save Comment"
                  icon={Save}
                  type="button"
                  onClick={handleSaveComment}
                  variant="primary"
                />
                <CustomButton
                  label="Cancel"
                  variant="secondary"
                  type="button"
                  onClick={() => setIsAddingComment(false)}
                />
              </div>
            </div>
          )}
          <div className="mt-7 flex gap-1.5 flex-wrap">
            <CustomButton
              icon={Plus}
              label="Add Comment"
              variant="secondary"
              onClick={handleAddCommentClick}
            />
            <CustomButton
              icon={CheckCircle}
              label="Update Status"
              variant="secondary"
            />
            <CustomButton icon={Save} label="Save Changes" variant="primary" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
