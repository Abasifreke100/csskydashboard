import { Corporate, Response } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { ActivateUserFormSchema } from "../../../schema/user";
import { Textarea } from "../../../components/ui/textarea";
import { useMemo } from "react";

const ActivateUserModal = ({
  data,
  closeActivateUser,
  verifyStatus,
}: {
  data?: Response | Corporate;
  closeActivateUser: () => void;
        verifyStatus: () => void;
}) => {
  const form = useForm<z.infer<typeof ActivateUserFormSchema>>({
    resolver: zodResolver(ActivateUserFormSchema),
    defaultValues: {
      username:
        (data as Response)?.firstName ?? (data as Corporate)?.companyName,
      password: "",
      paymentLink: "",
      email:
        (data as Response)?.firstName && (data as Response)?.surName
          ? `${(data as Response).firstName} ${(data as Response).surName}`
          : (data as Corporate)?.companyName,
      subject: "",
    },
  });

  const message = useMemo(() => {
    const values = form.getValues();
    return `Dear ${values.username},

Kindly find below your login details to MyCSSApp. Kindly keep it safe and do not share with anyone else.

Username: ${values.username}
Password: ${values.password}
Payment Link: ${values.paymentLink}
`;
  }, [
    form.watch("username"),
    form.watch("password"),
    form.watch("paymentLink"),
  ]);

  function onSubmit(values: z.infer<typeof ActivateUserFormSchema>) {
    console.log(values);
      closeActivateUser();
      verifyStatus()
  }

  return (
    <div>
      <p className="text-sm text-primary uppercase">Verify User</p>
      <p className="text-xl font-semibold">Activate</p>
      <p>
        Kindly fill in the account activation details created for this user
        carefully and correctly.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-h-[400px] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100"
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100"
                      placeholder="Paste password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="paymentLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Link</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="Paste Payment Link"
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
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="Paste Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Subject</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="My CSS Account Activation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea
                className="bg-gray-100 resize-y h-44"
                value={message}
                readOnly
              />
            </FormControl>
          </FormItem>
          <div className="w-full">
            <Button
              className="w-full bg-primary rounded-full h-12"
              type="submit"
            >
              Proceed
            </Button>
            <Button
              type="button"
              onClick={() => closeActivateUser()}
              className="w-full mt-2 bg-white hover:bg-white border-primary border text-primary rounded-full h-12"
            >
              Later
            </Button>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActivateUserModal;
