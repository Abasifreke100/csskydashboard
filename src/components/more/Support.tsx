import { useState, useRef } from "react";
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
import { successToast, errorToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { User } from "../../types";
import emailjs from "@emailjs/browser";

interface SupportFormProps {
  user: User | null;
  setOpenSupportDialog: (isOpen: boolean) => void;
}

const SupportForm = ({ user, setOpenSupportDialog }: SupportFormProps) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null); // Create form ref

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      surname: user?.lastName ?? "",
      firstname: user?.firstName ?? "",
      email: user?.email ?? "",
      message: "",
    },
  });

  const sendEmail = async () => {
    try {
      const templateParams = {
        surname: form.getValues("surname"),
        firstname: form.getValues("firstname"),
        email: form.getValues("email"),
        message: form.getValues("message"),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      successToast({
        title: "Email Sent",
        message: "Your support message has been sent via email.",
      });
      setOpenSupportDialog(false); // Close the support dialog after sending the email

    } catch (error) {
      errorToast({
        title: "Email Failed",
        message: "An error occurred while sending your message.",
      });
    }
  };

  async function onSubmit() {
    try {
      setLoading(true);
      // Send the email using EmailJS
      await sendEmail();

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
        ref={formRef} // Attach formRef here
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
