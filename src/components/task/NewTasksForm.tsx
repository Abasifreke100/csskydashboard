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

interface NewTasksFormProps {
  className?: string;
  task?: ViewOneTaskDataResponse;
  currentPage?: number;
  itemsPerPage?: number;
  onClose?: () => void;
}

const NewTasksForm = ({
  className = "",
  task,
  currentPage = 1,
  itemsPerPage = 10,
  onClose = () => {},
}: NewTasksFormProps) => {
  const { taskID } = useParams();
  const isEditMode = !!task;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false); // Add this line

  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      dueDate: task ? new Date(task.dueDate) : new Date(),
      description: task?.description ?? "",
      priority: task?.priority ?? "",
      file: task?.file ?? undefined,
      assignee: task?.assignee?._id ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof newTaskFormSchema>) {
    setLoading(true);
    try {
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
      if (values.file?.[0]) {
        formData.append("file", values.file[0]);
      }

      const endpoint = isEditMode ? `/task/${taskID}` : "/task";
      const method = isEditMode ? "patch" : "post";
      const response = await axiosInstance[method](endpoint, formData);

      console.log(
        `Task ${isEditMode ? "updated" : "created"} successfully:`,
        response.data
      );

      successToast({
        title: `Task ${isEditMode ? "updated" : "created"} successfully:`,
        message: "Your tasks have been successfully loaded.",
      });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Tasks(currentPage, itemsPerPage),
      });
      if (isEditMode) {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.Get_Single_Task(taskID as string),
        });
      }

      form.reset();
      onClose();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} task:`,
        axiosError
      );
      errorToast({
        title: `Error ${isEditMode ? "updating" : "creating"} task:`,
        message: `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } tasks: ${axiosError?.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (task) {
      form.reset({
        title: task?.title || "",
        dueDate: task ? new Date(task.dueDate) : new Date(),
        description: task?.description || "",
        priority: task?.priority || "",
        file: task?.file || undefined,
        assignee: task?.assignee?._id ?? "",
      });
    }
  }, [task, form]);

  return (
    <Card className="mt-6 mb-6">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div
              className={cn("grid grid-cols-1 gap-6 md:grid-cols-2", className)}
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
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attach File</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Attach a file"
                        type="file"
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
                        <SelectItem value="john doe">John Doe</SelectItem>
                        <SelectItem value="nathan knorr">
                          Nathan Knorr
                        </SelectItem>
                        <SelectItem value="ema figma">Ema Figma</SelectItem>
                      </SelectContent>
                    </Select>
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
              isLoading={isEditMode && loading}
              loadingText={isEditMode ? "Editing" : "Creating"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewTasksForm;
