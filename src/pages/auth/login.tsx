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
import logo from "../../assets/cssMobileImage.png";
import mainLogo from "../../assets/cssIM.png";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { login } from "../../features/auth/authActions";
import { useAppDispatch } from "../../app/hooks";
import InputToggle from "../../utils/input-toggle";
import { clearError } from "../../features/auth/authSlice";
import AlertError from "../../error/error-alert";
import { useEffect, useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type LoginFormValues = z.infer<typeof formSchema>;

function LoginPage() {
  useTitleUpdater({ "/login": "Connect-Surf-Smile | Login" });
  useMetaTagUpdater({
    "/login": [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
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
      localStorage.getItem("rememberedCredentials") || "{}"
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
     await dispatch(login(formData));
      toast({
        title: "Success",
        description: "User successfully logged in ",
      });
      navigate("/");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 flex flex-col lg:flex-row">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 order-1 lg:order-2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:relative lg:block lg:p-12">
              {/* Additional content for large screens */}
            </div>
          </section>

          <main className="flex items-center order-2 lg:order-1 justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <img src={logo} alt="logo" />
                </a>
              </div>
              <div>
                <img
                  src={mainLogo}
                  alt="logo"
                  className="w-30 h-24 hidden lg:block"
                />
              </div>
              <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome Back
              </h1>

              {authState?.user?.message && (
                <AlertError
                  variant="default"
                  title="Success"
                  description={authState.user.message}
                />
              )}

              {authState.error && (
                <AlertError
                  variant="destructive"
                  // title="Error"
                  description={authState.error}
                  onClick={form.handleSubmit(onSubmit)}
                />
              )}

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
                          <FormLabel className="text-sm">
                            Email Address
                          </FormLabel>
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
                      className="w-full bg-[#000000E5] text-white hover:bg-[#000000E5]"
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
                          Loading...
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

                    <p className="text-xs text-grey">Forgot Password</p>
                  </div>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
