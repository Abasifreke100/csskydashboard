import useMetaTagUpdater from "../../utils/useMetaTagUpdater";
import useTitleUpdater from "../../utils/useTitleUpdater";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schema/login-schema";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { login } from "../../features/auth/authActions";
import { useAppDispatch } from "../../app/hooks";
import InputToggle from "../../utils/input-toggle";
import { clearError, isAuthenticated } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./layout";
import { Cssky_Dashboard_Routes } from "../../components/store/data";
import { errorToast, successToast } from "../../utils/toast";

type LoginFormValues = z.infer<typeof formSchema>;

function LoginPage() {
  useTitleUpdater({ "/auth/sign-in": "Connect-Surf-Smile | Login" });
  useMetaTagUpdater({
    "/login": [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const loggedIn = useSelector((state: RootState) => isAuthenticated(state));
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  setTimeout(() => {
    dispatch(clearError());
  }, 3000);

  const handleRememberMeChange = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    localStorage.setItem("rememberMe", newValue.toString());
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("rememberedCredentials") ?? "{}"
    );

    if (rememberMe && storedCredentials.email && storedCredentials.password) {
      form.setValue("email", storedCredentials.email);
      form.setValue("password", storedCredentials.password);
    }
  }, [rememberMe, form.setValue]);

  useEffect(() => {
    const rememberMePreference = localStorage.getItem("rememberMe");
    if (rememberMePreference === "true") {
      setRememberMe(true);
    } else {
      setRememberMe(false);
      localStorage.removeItem("rememberedCredentials");
    }
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (rememberMe) {
      localStorage.setItem(
        "rememberedCredentials",
        JSON.stringify({ email: data.email, password: data.password })
      );
    } else {
      localStorage.removeItem("rememberedCredentials");
    }

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        successToast({
          title: "Login Success",
          message: "You have successfully logged in.",
        });
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      errorToast({
        title: "Error",
        message: "Failed to log in. Please check your email and password.",
      });
    }
  };

  if (loggedIn) {
    navigate("/");
  }

  return (
    <AuthLayout header="Welcome back">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 grid grid-cols-6 gap-6 min-w-[340px] max-w-[443px]"
        >
          <div className="col-span-6">
            <FormField<LoginFormValues>
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-[#F5F5F7] border rounded-xl border-grey text-grey placeholder:text-grey"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 ">
            <FormField<LoginFormValues>
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
              disabled={authState.isLoading}
            >
              {authState.isLoading ? (
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
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          <div className="col-span-6 flex justify-between sm:items-center sm:gap-4">
            <div className="items-center flex space-x-2">
              <Checkbox
                id="terms1"
                checked={rememberMe}
                onCheckedChange={handleRememberMeChange}
                className="text-grey bg-transparent data-[state=checked]:bg-white border-grey data-[state=checked]:text-grey-foreground"
              />

              <label
                htmlFor="terms1"
                className="text-xs text-grey font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember Me
              </label>
            </div>
          </div>
          <p className="text-xs col-span-6 text-center text-grey font-medium">
            Don&apos;t have an account ?{" "}
            <Link className="text-primary" to={Cssky_Dashboard_Routes.signUp}>
              Request Access
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}

export default LoginPage;
