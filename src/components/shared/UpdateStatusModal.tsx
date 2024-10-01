// UpdateStatusDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import CustomCompulsoryInputStar from "../../components/task/CustomCompulsoryInputStar";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { CheckCircle, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successToast, errorToast } from "../../utils/toast";
import { QueryKeys } from "../../models/query";
import axiosInstance from "../../api/connectSurfApi";

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  currentStatus: string;
  onStatusUpdate?: () => void; // Callback for after status update (optional)
}

const UpdateStatusDialog = ({
  open,
  onOpenChange,
  taskId,
  currentStatus,
  onStatusUpdate, // Make this optional
}: UpdateStatusDialogProps) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      status: currentStatus || "",
    },
  });

  const updateTaskStatus = async (taskId: string, status: string) => {
    // Replace with your actual API call
    const { data } = await axiosInstance.patch(`/task/${taskId}`, { status });
    return data;
  };

  const mutation = useMutation({
    mutationFn: (newStatus: string) => updateTaskStatus(taskId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Single_Task(taskId),
      });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Tasks(1, 10),
      });
       queryClient.invalidateQueries({
         queryKey: QueryKeys.Get_Notifications(1, 10), 
       });
      successToast({
        title: "Task status updated successfully",
        message: "Your task status has been updated.",
      });
      if (onStatusUpdate) onStatusUpdate();
      onOpenChange(false);
    },
    onError: (error) => {
      errorToast({
        title: "Error updating task status",
        message:
          "An error occurred while updating your task status. Please try again.",
      });
      console.error("Error updating status:", error);
    },
  });

  const onSubmit = (data: { status: string }) => {
    mutation.mutate(data.status);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <CustomButton
        icon={CheckCircle}
        label="Update Status"
        variant="secondary"
        onClick={() => onOpenChange(true)}
      />
      <DialogContent className="w-[340px] rounded-md md:w-[400px]">
        <DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-start"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 flex">
                        Update Task Status
                        <CustomCompulsoryInputStar />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-200 outline-none border-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <CustomButton
                    label="Update"
                    variant="primary"
                    icon={Save}
                    type="submit"
                    loadingText="Updating Status"
                    isLoading={mutation.isPending}
                  />
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
