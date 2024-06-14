import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error/error";
import LoginPage from "../pages/auth/login";
import SignUp from "../pages/auth/sign-up";
import DashboardLayout from "../layout";
import Home from "../pages/page";
import CustomersPage from "../pages/customers/page";
import CustomersIdPage from "../pages/[customersId]/page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "customers/:customersId",
        element: <CustomersIdPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
