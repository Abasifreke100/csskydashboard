import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskId: string) => void;
  taskToDelete: string | null;
  title?: string;
  message?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  taskToDelete,
  title = "Are you sure?",
  message = "Do you really want to delete this task?",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg p-6 w-11/12 max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(taskToDelete as string)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
