import { useState } from "react";
import useMetaTagUpdater from "../../utils/useMetaTagUpdater";
import useTitleUpdater from "../../utils/useTitleUpdater";
import AuthLayout from "./layout";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "../../schema/sign-up-schema";
import { SignUpData, UserService } from "../../service/user";
import { useMutation } from "@tanstack/react-query";
import { Cssky_Dashboard_Routes } from "../../components/store/data";
import InputToggle from "../../utils/input-toggle";
import { Checkbox } from "../../components/ui/checkbox";
import { errorToast, successToast } from "../../utils/toast";

const SignUp = () => {
  useTitleUpdater({ "/sign-up": "Connect-Surf-Smile | Sign Up" });
  useMetaTagUpdater({
    "/sign-up": [
      { name: "description", content: "This is the sign-up page description." },
      { name: "keywords", content: "sign up, registration, user" },
    ],
  });

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Mutation for handling sign-up
  const signUpMutation = useMutation<void, Error, SignUpData>({
    mutationFn: async (signUpData: SignUpData): Promise<void> => {
      await UserService.signUpUser(signUpData);
    },
    onSuccess: () => {
      successToast({ title: "Success", message: "User successfully signed up" });
      navigate("/auth/sign-in");
    },
    onError: (error: Error) => {
      errorToast({
        title: "Error",
        message: error.message || "An unexpected error occurred",
      });
    },
  });

  // Submit handler for the sign-up form
  const onSubmit = (data: SignUpFormValues) => {
    if (isChecked) {
      signUpMutation.mutate(data);
    } else {
      errorToast({
        title: "Error",
        message:
          "You must agree to the Privacy Policy and Terms and Conditions",
      });
    }
  };

  return (
    <AuthLayout header="Apply For Access">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 grid grid-cols-6 gap-6  min-w-[340px] max-w-[443px]"
        >
          <div className="col-span-6">
            <FormField<SignUpFormValues>
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="bg-[#F5F5F7] border border-grey rounded-xl text-grey placeholder:text-grey"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField<SignUpFormValues>
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="bg-[#F5F5F7] border border-grey rounded-xl text-grey placeholder:text-grey"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField<SignUpFormValues>
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-[#F5F5F7] border border-grey rounded-xl text-grey placeholder:text-grey"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField<SignUpFormValues>
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputToggle
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button
              type="submit"
              className="w-full bg-primary rounded-full text-white hover:bg-primary/75"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Requesting access...
                </div>
              ) : (
                "Request Access"
              )}
            </Button>
          </div>
          <div className="col-span-6 flex justify-between sm:items-center sm:gap-4">
            <div className="items-center flex space-x-2">
              <Checkbox
                id="terms2"
                checked={isChecked}
                onCheckedChange={() => setIsChecked(!isChecked)}
                className="text-grey bg-transparent data-[state=checked]:bg-white border-grey data-[state=checked]:text-grey-foreground"
              />

              <label
                htmlFor="terms2"
                className="text-sm w-80 text-grey font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the Privacy Policy and Terms and
                Conditions
              </label>
            </div>
          </div>
          <p className="text-xs col-span-6 text-center text-grey font-medium font-poppins">
            Already have an account?{" "}
            <Link to={Cssky_Dashboard_Routes.signIn} className="text-primary">
              Sign in instead
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
