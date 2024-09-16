import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import axiosInstance from "../../api/connectSurfApi";
import { errorToast, successToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../types";
import profileFormSchema, {
  ProfileFormValues,
} from "../../schema/profile-schema";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

interface ProfileFormProps {
  user?: User;
  onClose?: () => void;
  setDeleteModalOpen: (value: boolean) => void;
  setOpenProfileDialog: (value: boolean) => void;
}

const ctaButtons = [
  {
    label: "Delete",
    className: "bg-[#fff0ef] text-red-600 hover:bg-[#fff0ef]",
    action: "delete",
  },
  {
    label: "Request Upgrade",
    className:
      "bg-[#f5f5f7] text-[#9c9c9c] border border-grey-400 hover:bg-[#f5f5f7]",
    action: "requestUpgrade",
  },
  {
    label: "Save Changes",
    className: "bg-[#ff7f00] text-white hover:bg-[#ff7f00]",
    action: "saveChanges",
  },
];

const ProfileForm = ({
  user,
  onClose = () => {},
  setDeleteModalOpen,
  setOpenProfileDialog,
}: ProfileFormProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Add the useDispatch hook to dispatch actions

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      surname: user?.lastName ?? "",
      firstname: user?.firstName ?? "",
      email: user?.email ?? "",
      password: "",
      employeeNumber: "",
      accessTier: user?.tier ?? "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/profile", values); // Adjust endpoint as needed
      console.log(response);

      dispatch(
        setCredentials({
          token: localStorage.getItem("accessToken") as string,
          user: response.data.user, // Assuming the API returns the updated user object
        })
      );

      successToast({
        title: "Profile updated successfully",
        message: "Your profile has been updated.",
      });

      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      }); // Adjust query key as needed
      form.reset();
      onClose();
    } catch (error: unknown) {
      errorToast({
        title: "Error updating profile",
        message: `An error occurred: ${(error as AxiosError)?.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleButtonClick = async (action: string) => {
    if (action === "saveChanges") {
      setLoading(true);
      form.handleSubmit(onSubmit)();
    } else if (action === "requestUpgrade") {
      if (user?._id) {
        try {
          await axiosInstance.post("/user/admin/request/upgrade", {
            userId: user._id,
          });
          successToast({
            title: "Upgrade Requested",
            message: "Your upgrade request has been submitted.",
          });
        } catch (error: unknown) {
          errorToast({
            title: "Error Requesting Upgrade",
            message: `An error occurred: ${(error as AxiosError)?.message}`,
          });
        }
      }
    } else if (action === "delete") {
      setOpenProfileDialog(false);
      setDeleteModalOpen(true);
    }
  };

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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
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
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Employee Number"
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
            name="accessTier"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Access Tier</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-200 outline-none border-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                      <SelectValue placeholder="Select an access tier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tier-1">Tier 1</SelectItem>
                    <SelectItem value="tier-2">Tier 2</SelectItem>
                    <SelectItem value="tier-3">Tier 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          {ctaButtons.map((button) => (
            <Button
              key={button.label}
              onClick={() => handleButtonClick(button.action)}
              disabled={loading && button.action === "saveChanges"}
              className={`${button.className} flex-1 rounded-lg`}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
