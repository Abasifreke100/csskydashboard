import { useState } from "react";
import { DefaultDialogProps } from "../../models/shared";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { truncateText } from "../../utils/text";
import { getStatusColor } from "../../utils/status";
import CustomButton from "./CustomButton";
import { CheckCircle, Plus, Save } from "lucide-react";
import { Badge } from "../ui/badge";

interface TicketDetailsModalProps extends DefaultDialogProps {
  rowId: string | null;
}

const TicketDetailsModal = ({
  isOpen,
  onClose,
  rowId,
}: TicketDetailsModalProps) => {
  const [isAddingComment, setIsAddingComment] = useState(false); // State to manage comment input visibility
  const [comment, setComment] = useState(""); // State to manage comment input value

  const onCloseModal = () => {
    onClose();
  };

  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

  const handleSaveComment = () => {
    console.log("Comment saved:", comment); // This is where you will handle the API call in the future
    setComment("");
    setIsAddingComment(false);
  };

  const sampleData = [
    {
      id: "TICK123456",
      subject: "Issue with login",
      description:
        "The primary objective of this task is to update and refine our project documentation to ensure accuracy, clarity, and completeness. This includes revising existing content, adding new sections where necessary, and ensuring that all information is up-to-date and easy to understand.",
      priority: "High",
      status: "Pending",
      createdOn: "2/10/2023",
      lastUpdated: "12/10/2023",
      assignee: {
        name: "John Doe",
        avatar: "https://example.com/john-doe.jpg",
        comments: "initial report on login issue",
      },
    },
  ];

  const ticket = sampleData.find((item) => item.id === rowId);

  if (!ticket) {
    return null;
  }

  const statusTextColor = getStatusColor(ticket.status);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby="ticket-details-description"
        className="font-poppins rounded-xl max-w-[380px] md:max-w-[450px] lg:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-sm">Ticket ID #{ticket.id}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3 text-xs">
          <p className="font-medium text-gray-400 ">
            Subject: <span className="text-black ">{ticket.subject}</span>
          </p>
          <p className="font-medium  text-gray-400">
            Description: <br />
            <span className="text-black text-xs">{ticket.description}</span>
          </p>
          <p className="font-medium text-gray-400">
            Priority: <span className="text-black">{ticket.priority}</span>
          </p>
          <p className="font-medium text-gray-400">
            Status:{" "}
            <span className={`${statusTextColor}`}>{ticket.status}</span>
          </p>
          <p className="font-medium text-gray-400">
            Created On: <span className="text-black">{ticket.createdOn}</span>
          </p>
          <p className="font-medium text-gray-400">
            Last Updated:{" "}
            <span className="text-black">{ticket.lastUpdated}</span>
          </p>
          <p className="font-medium text-gray-400">
            Assignee: <span className="text-black">{ticket.assignee.name}</span>
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
          <div className="flex items-center w-full justify-between mt-2">
            <div className="flex items-center">
              <Avatar className="mr-1">
                <AvatarImage src="https://github.com/max-programming.png" />
                <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="ml-1 ">
                <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-0.5">
                    <p className="text-xs text-black">
                      {truncateText(ticket.assignee.name, 13)}
                    </p>{" "}
                    <Badge className="h-4 px-1  text-xs  bg-secondary hover:bg-secondary">
                      Tier 3
                    </Badge>
                  </div>
                  <p className="text-[10px]">
                    {truncateText(ticket.assignee.comments, 30)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs font-medium">1H ago</p>
          </div>
          {/* buttons add comment , update status , save changes */}
          {isAddingComment && (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment"
                className="w-full mt-4 text-sm outline-none p-2 border rounded-md"
              />
              <div className="flex gap-1.5">
                <CustomButton
                  label="Save Comment"
                  icon={Save}
                  onClick={handleSaveComment}
                  variant="primary"
                />
                <CustomButton
                  label="Cancel"
                  variant="secondary"
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
