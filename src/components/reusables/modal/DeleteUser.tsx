import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "../../../models/query";
import { UserService } from "../../../service/user";

interface DeleteCustomerDialogProps {
  id: string;
  type?: string;
  onDelete: (() => Promise<void>) | (() => void);
  trigger?: React.ReactNode;
}


const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({
  id,
  onDelete,
  type,
  trigger, // Use the trigger prop
}) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => UserService.deleteCustomer(id, type),
    mutationKey: [QueryKeys.Delete_Customer],
  });

  const handleDeleteUser = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      toast.promise(mutateAsync(), {
        loading: "Deleting customer...",
        success(data: unknown) {
          console.log(data);
          onDelete();
          return "Customer deleted successfully";
        },
        error: (err) => err.message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      {/* If a custom trigger is passed, render it, otherwise render the default trigger */}
      {trigger ? (
        <DialogTrigger onClick={(e) => e.stopPropagation()}>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger
          className="w-full flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Trash2 className="text-[#FF3B30]" />
          <p className="font-medium py-2">Delete Customer</p>
        </DialogTrigger>
      )}

      <DialogContent className="flex flex-col items-center">
        <DialogHeader className="flex flex-col items-center space-y-6">
          <DialogTitle>
            <TriangleAlert size={72} className="text-[#FF3B30]" />
          </DialogTitle>
          <DialogDescription className="text-center">
            <p className="text-black font-medium text-md">
              Do you want to delete this customer?
            </p>
            <p>
              You will lose all information provided by this customer
              permanently
            </p>
          </DialogDescription>
          <div className="w-full">
            <Button
              className="w-full bg-primary mt-5 rounded-full h-12"
              onClick={(e) => handleDeleteUser(e)}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Proceed"}
            </Button>
            <Button
              className="w-full mt-4 bg-white hover:bg-white border-primary border text-primary rounded-full h-12"
              onClick={(e) => onCancel(e)}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCustomerDialog;
