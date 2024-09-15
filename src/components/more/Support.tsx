import  { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import supportFormSchema, {
  SupportFormValues,
} from "../../schema/support-form-schema";
import axiosInstance from "../../api/connectSurfApi";
import { successToast, errorToast } from "../../utils/toast";
import { AxiosError } from "axios";

const SupportForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      surname: "",
      firstname: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: SupportFormValues) {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/support", values); // Adjust endpoint as needed
      console.log(response);

      successToast({
        title: "Message sent successfully",
        message: "Your support message has been sent.",
      });

      form.reset();
    } catch (error: unknown) {
      errorToast({
        title: "Error sending message",
        message: `An error occurred: ${(error as AxiosError)?.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 h-fit w-full"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-start">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Surname"
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
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Firstname"
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
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    type="email"
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
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="bg-gray-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          <Button
            type="submit"
            className="bg-[#ff7f00] text-white w-full hover:bg-[#ff7f00]"
            disabled={loading}
          >
            Submit Message
          </Button>
      </form>
    </Form>
  );
};

export default SupportForm;
