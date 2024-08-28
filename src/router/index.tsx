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
import { Cssky_Dashboard_Routes } from "../components/store/data";
import TicketPage from "../pages/ticket/page";
import InboxPage from "../pages/inbox/page";
import InboxDetailsPage from "../pages/inbox/[inboxId]/page";
import HistoryPage from "../pages/history/page";
import AdminPage from "../pages/admin/page";
import TaskIDDetailsPage from "../pages/[taskId]/page";

export const router = createBrowserRouter([
  {
    path: Cssky_Dashboard_Routes.signIn,
    element: <LoginPage />,
  },
  {
    path: Cssky_Dashboard_Routes.signUp,
    element: <SignUp />,
  },
  {
    path: Cssky_Dashboard_Routes.dashboard,
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: Cssky_Dashboard_Routes.customersPage,
        element: <CustomersPage />,
      },
      {
        path: Cssky_Dashboard_Routes.customersIdPage,
        element: <CustomersIdPage />,
      },
      {
        path: Cssky_Dashboard_Routes.insights,
        element: <Insights />,
      },
      {
        path: Cssky_Dashboard_Routes.tasks,
        element: <Tasks />,
      },
      {
        path: Cssky_Dashboard_Routes.taskId,
        element: <TaskIDDetailsPage />,
      },
      {
        path: Cssky_Dashboard_Routes.apiBindings,
        element: <ApiBindings />,
      },
      {
        path: Cssky_Dashboard_Routes.more,
        element: <More />,
      },
      {
        path: Cssky_Dashboard_Routes.tickets,
        element: <TicketPage />,
      },
      {
        path: Cssky_Dashboard_Routes.inbox,
        element: <InboxPage />,
      },
      {
        path: Cssky_Dashboard_Routes.inboxDetail,
        element: <InboxDetailsPage />,
      },{
        path:Cssky_Dashboard_Routes.history,
        element : <HistoryPage/>
      },
      {
        path: Cssky_Dashboard_Routes.admin,
        element: <AdminPage/>
      }
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);