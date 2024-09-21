import { DefaultDialogProps } from "../../models/shared";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getStatusColor } from "../../utils/status";
import { renderCellContent } from "../store/data/task";
import { Ticket } from "../../hooks/useFetchTickets";

interface TicketDetailsModalProps extends DefaultDialogProps {
  rowId: string | null;
  tickets: Ticket[];
}

const TicketDetailsModal = ({
  isOpen,
  onClose,
  rowId,
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
