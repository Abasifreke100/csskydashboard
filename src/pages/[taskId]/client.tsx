import { CheckCircle, Plus, Save } from "lucide-react";
import { CardTitle, CardContent, Card } from "../../components/ui/card";
import CustomButton from "../../components/shared/CustomButton";
import NewTasksForm from "../../components/task/NewTasksForm";
import CommentsSection from "../../components/task/comments/CommentsSection";
import { ViewOneTaskDataResponse } from "../../types/task";
import { getStatusColor } from "../../utils/status";
import Header from "../../components/global/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
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
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/connectSurfApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toast";
import { QueryKeys } from "../../models/query";
import { useState } from "react";
import { formatDate } from "../../utils/date";

interface TaskClientPageProps {
  task: ViewOneTaskDataResponse;
  isAddingComment: boolean;
  message: string;
  setIsAddingComment: (value: boolean) => void;
  setMessage: (value: string) => void;
  handleSaveComment: () => void;
  handleAddCommentClick: () => void;
  shouldRefetchComments: boolean;
  setShouldRefetchComments: (value: boolean) => void;
}

const updateTaskStatus = async (taskId: string, status: string) => {
  const { data } = await axiosInstance.patch(`/task/${taskId}`, { status });
  return data;
};

const TaskClientPage = ({
  task,
  isAddingComment,
  message,
  setIsAddingComment,
  setMessage,
  handleSaveComment,
  handleAddCommentClick,
  shouldRefetchComments,
  setShouldRefetchComments,
}: TaskClientPageProps) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusTextColor = getStatusColor(task.status);

  const form = useForm({
    defaultValues: {
      status: task.status || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newStatus: string) => updateTaskStatus(task._id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Single_Task(task._id),
      });
      successToast({
        title: "Task status updated successfully",
        message: "Your task status has been updated.",
      });
      setIsDialogOpen(false); // Close the dialog on success
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
    <div className=" h-full w-full ">
      <Header title="Task Details" icon={true} />
      <Card className="mt-3 h-fit">
        <CardContent
          aria-describedby="task-details-description"
          className="font-poppins rounded-xl"
        >
          <CardTitle className="text-sm mt-5">{task.taskId}</CardTitle>

          <div className="flex flex-col gap-3 mt-3 text-xs">
            <p className="font-medium text-gray-400">
              Task Title: <span className="text-black">{task.title}</span>
            </p>
            <p className="font-medium text-gray-400">
              Description: <br />
              <span className="text-black text-xs">{task.description}</span>
            </p>
            <p className="font-medium text-gray-400">
              Priority: <span className="text-black">{task.priority}</span>
            </p>
            <p className="font-medium text-gray-400">
              Status: <span className={statusTextColor}>{task.status}</span>
            </p>
            <p className="font-medium text-gray-400">
              Assignee:{" "}
              <span className="text-black">{task.assignee?.email}</span>
            </p>
            <p className="font-medium text-gray-400">
              Due date: <span className="text-black">{task.dueDate}</span>
            </p>
            <p className="font-medium text-gray-400">
              Last Updated:{" "}
              <span className="text-black">
              {formatDate(task.updatedAt)}
              </span>
            </p>
          </div>
          <div className="mt-3 max-h-[150px] border-t overflow-y-auto py-2">
            {/* Comments Section */}
            <CommentsSection
              taskID={task._id}
              refetchComments={shouldRefetchComments}
              onRefetchComplete={() => setShouldRefetchComments(false)}
            />

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
                type="button"
                onClick={handleAddCommentClick}
              />

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <CustomButton
                    icon={CheckCircle}
                    label="Update Status"
                    variant="secondary"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Status
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
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="in-progress">
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                      Completed
                                    </SelectItem>
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
            </div>
          </div>
        </CardContent>
      </Card>
      <NewTasksForm task={task} />
    </div>
  );
};

export default TaskClientPage;
