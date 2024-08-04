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

const NewTasksForm = () => {
  const { taskID } = useParams();
  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: "",
      dueDate: new Date(),
      description: "",
      priority: "",
      file: undefined,
      assignee: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof newTaskFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="mt-6 mb-6">
      <CardContent
        aria-describedby="task-details-description"
        className="font-poppins rounded-xl"
      >
        <CardTitle className="text-sm mt-5">#{taskID}</CardTitle>
        <div className="flex flex-col gap-3 mt-3 text-xs mb-4">
          <p className="font-medium text-gray-400 ">
            Kindly fill out the fields below correctly
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Verify KYC"
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
                      buttonClassName="bg-gray-200 "
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
                        placeholder="The goal of this task is to verify the Know Your Customer (KYC) documentation to ensure compliance with regulatory standards. This involves reviewing customer-submitted documents for authenticity and accuracy."
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
                          <SelectValue placeholder="Select a priority to display" />
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
                    <FormLabel>
                      Attach File
                      <CustomCompulsoryInputStar />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Screenshot 1234"
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
                          <SelectValue placeholder="Select an assignee to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="john doe">John Doe </SelectItem>
                        <SelectItem value="nathan knorr">
                          Nathan Knorr
                        </SelectItem>
                        <SelectItem value="ema figma">Ema Figma </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CustomButton
              icon={Save}
              label="Create Task"
              variant="primary"
              type="submit"
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewTasksForm;
