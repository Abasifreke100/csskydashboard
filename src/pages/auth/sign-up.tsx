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
import { useToast } from "../../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "../../schema/sign-up-schema";
import { SignUpData, UserService } from "../../service/user";
import { useMutation } from "@tanstack/react-query";
import { Cssky_Dashboard_Routes } from "../../components/store/data";

const SignUp = () => {
  useTitleUpdater({ "/sign-up": "Connect-Surf-Smile | Sign Up" });
  useMetaTagUpdater({
    "/sign-up": [
      { name: "description", content: "This is the sign-up page description." },
      { name: "keywords", content: "sign up, registration, user" },
    ],
  });

  const { toast } = useToast();
  const navigate = useNavigate();

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
      toast({ title: "Success", description: "User successfully signed up" });
      navigate("/auth/sign-in");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  // Submit handler for the sign-up form
  const onSubmit = (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <AuthLayout header="Sign up">
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
                      className="bg-[#F5F5F7] border border-grey text-grey placeholder:text-grey"
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
                      className="bg-[#F5F5F7] border border-grey text-grey placeholder:text-grey"
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
                      className="bg-[#F5F5F7] border border-grey text-grey placeholder:text-grey"
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
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-[#F5F5F7] border border-grey text-grey placeholder:text-grey"
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
              className="w-full bg-[#000000E5] text-white hover:bg-[#000000E5]"
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
                  Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
          <p className="text-xs col-span-6 text-center text-grey">
            Already have an account ?{" "}
            <Link to={Cssky_Dashboard_Routes.signIn}>Sign in</Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
