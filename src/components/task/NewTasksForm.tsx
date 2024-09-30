import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { newTaskFormSchema } from "../../schema/new-task-schema";
import CustomDatePicker from "../shared/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CustomButton from "../shared/CustomButton";
import { Save } from "lucide-react";
import CustomCompulsoryInputStar from "./CustomCompulsoryInputStar";
import axiosInstance from "../../api/connectSurfApi";
import { useQueryClient } from "@tanstack/react-query";
import cn from "../../lib/utils";
import { QueryKeys } from "../../models/query";
import { useEffect, useState } from "react";
import { ViewOneTaskDataResponse } from "../../types/task";
import { errorToast, successToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { useFetchUsers } from "../../hooks/useFetchAdmin";
import { User } from "../../types";

interface NewTasksFormProps {
  className?: string;
  cardClassName?: string
  task?: ViewOneTaskDataResponse;
  currentPage?: number;
  itemsPerPage?: number;
  onClose?: () => void;
}

const NewTasksForm = ({
  className = "",
  cardClassName= "",
  task,
  currentPage = 1,
  itemsPerPage = 10,
  onClose = () => {},
}: NewTasksFormProps) => {
  const { taskID } = useParams();
  const isEditMode = !!task;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false); // Add this line
  const { data: users } = useFetchUsers();

  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      dueDate: task ? new Date(task.dueDate) : new Date(),
      description: task?.description ?? "",
      priority: task?.priority ?? "",
      assignee: task?.assignee?._id ?? "",
      ticketID: task?.ticketID ?.toString() ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof newTaskFormSchema>) {
    try {
      const formData = createFormData(values);
      setLoading(true);
      const { endpoint, method } = getRequestConfig(isEditMode, taskID);

      const response = await sendRequest(method, endpoint, formData);

      handleSuccess(response.data);
      invalidateQueries();

      form.reset();
      onClose();
    } catch (error: unknown) {
      handleError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }

 function createFormData(values: z.infer<typeof newTaskFormSchema>): FormData {
   const formData = new FormData();
   formData.append("title", values.title ?? "");
   formData.append("description", values.description || "");
   formData.append("priority", values.priority ?? "");
   formData.append(
     "dueDate",
     values.dueDate.toLocaleDateString("en-US", {
       day: "numeric",
       month: "long",
       year: "numeric",
     })
   );
   formData.append("assignee", values.assignee ?? "");

   // Only append ticketID if it's a valid number
   if (values.ticketID !== undefined) {
     formData.append("ticketID", values.ticketID.toString());
   }

   return formData;
 }

  function getRequestConfig(isEditMode: boolean, taskID?: string) {
    const endpoint = isEditMode ? `/task/${taskID}` : "/task";
    const method: "post" | "patch" = isEditMode ? "patch" : "post"; // Explicitly type the method
    return { endpoint, method };
  }

  async function sendRequest(
    method: "post" | "patch",
    endpoint: string,
    formData: FormData
  ) {
    return await axiosInstance[method](endpoint, formData);
  }

  function handleSuccess(data: ViewOneTaskDataResponse) {
    console.log(
      `Task ${isEditMode ? "updated" : "created"} successfully:`,
      data
    );
    successToast({
      title: `Task ${isEditMode ? "updated" : "created"} successfully:`,
      message: "Your tasks have been successfully loaded.",
    });
  }

  function invalidateQueries() {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.Get_Tasks(currentPage, itemsPerPage),
    });

    
    if (isEditMode && taskID) {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Single_Task(taskID),
      });
    }

     queryClient.invalidateQueries({
       queryKey: QueryKeys.Get_Notifications(1, 10), // Replace with the appropriate page and size if dynamic
     });
  }

  function handleError(error: AxiosError) {
    console.error(`Error ${isEditMode ? "updating" : "creating"} task:`, error);

    errorToast({
      title: `Error ${isEditMode ? "updating" : "creating"} task:`,
      message: `An error occurred while ${
        isEditMode ? "updating" : "creating"
      } tasks: ${error?.message}`,
    });
  }

  useEffect(() => {
    if (task) {
      form.reset({
        title: task?.title || "",
        dueDate: task ? new Date(task.dueDate) : new Date(),
        description: task?.description || "",
        priority: task?.priority || "",
        assignee: task?.assignee?._id ?? "",
        ticketID: task?.ticketID?.toString() ?? undefined,
      });
    }
  }, [task, form]);

  return (
    <Card className={cn("mt-6 relative mb-12", cardClassName)}>
      <CardContent
        aria-describedby="task-details-description"
        className="font-poppins rounded-xl"
      >
        <CardTitle className="text-sm mt-5">
          {isEditMode ? `Edit Task ${task.taskId}` : "Create New Task"}
        </CardTitle>
        <div className="flex flex-col gap-3 mt-3 text-xs mb-4">
          <p className="font-medium text-gray-400">
            Kindly fill out the fields below correctly
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 h-fit w-full"
          >
            <div
              className={cn(
                "grid grid-cols-1 gap-6 md:grid-cols-2 text-start",
                className
              )}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Register"
                        type="text"
                        className="bg-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-2">
                      Due Date
                      <CustomCompulsoryInputStar />
                    </FormLabel>
                    <CustomDatePicker
                      control={form.control}
                      name="dueDate"
                      buttonClassName="bg-gray-200"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Task Description
                      <CustomCompulsoryInputStar />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The primary objective of this task is to update and refine our project."
                        className="h-24 bg-gray-200 resize-y outline-none border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Priority
                      <CustomCompulsoryInputStar />
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-200 outline-none border-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Assignee
                      <CustomCompulsoryInputStar />
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-200 outline-none border-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                          <SelectValue placeholder="Select an assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users?.data?.response
                          ?.filter(
                            (user: User) =>
                              user.email !== "superadmin@gmail.com"
                          ) // Filter out the superadmin user
                          .map((user: User) => (
                            <SelectItem key={user?._id} value={user?._id}>
                              {user?.firstName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticketID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket ID (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Ticket ID"
                        type="text"
                        className="bg-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CustomButton
              icon={Save}
              label={isEditMode ? "Update Task" : "Create Task"}
              variant="primary"
              type="submit"
              isLoading={loading}
              loadingText={isEditMode ? "Editing Task" : "Creating Task"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewTasksForm;
