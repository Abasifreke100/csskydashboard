import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error/error";
import LoginPage from "../pages/auth/login";
import SignUp from "../pages/auth/sign-up";
import DashboardLayout from "../layout";
import Home from "../pages/page";
import CustomersPage from "../pages/customers/page";
import CustomersIdPage from "../pages/[customersId]/page";
import Insights from "../pages/insights/page";
import Tasks from "../pages/tasks/page";
import ApiBindings from "../pages/api-bindings/page";
import More from "../pages/more/page";
import TaskID from "../pages/[taskId]/page";

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
        path: "/customers/:type",
        element: <CustomersPage />,
      },
      {
        path: "/customers/:type/:customerId",
        element: <CustomersIdPage />,
      },
      {
        path: "/insights",
        element: <Insights />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/tasks/:taskID",
        element: <TaskID />,
      },
      {
        path: "/api-bindings",
        element: <ApiBindings />,
      },
      {
        path: "/more",
        element: <More />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
