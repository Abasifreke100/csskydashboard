import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import BillingInfoPage from "../pages/billing-info/page";
import { RootState } from "../app/store";

// A higher-order component to protect routes based on user tier
const ProtectedRoute = ({
  element,
  restrictedTiers,
}: {
  element: JSX.Element;
  restrictedTiers?: string[];
}) => {
  const user = useSelector((state: RootState) => state.auth);
  const userTier = user?.user?.tier;

  // If userTier is 'tier-4' or restrictedTiers is not an array, allow access
  if (userTier === "tier-4" || !Array.isArray(restrictedTiers)) {
    return element;
  }

  if (typeof userTier === "string" && restrictedTiers.includes(userTier)) {
    return <Navigate to={Cssky_Dashboard_Routes.dashboard} />;
  }

  return element;
};


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
        element: <ProtectedRoute element={<Insights />} />,
      },
      {
        path: Cssky_Dashboard_Routes.tasks,
        element: <ProtectedRoute element={<Tasks />} restrictedTiers={[""]} />,
      },
      {
        path: Cssky_Dashboard_Routes.taskId,
        element: <ProtectedRoute element={<TaskIDDetailsPage />} />,
      },
      {
        path: Cssky_Dashboard_Routes.apiBindings,
        element: (
          <ProtectedRoute
            element={<ApiBindings />}
            restrictedTiers={["tier-1"]}
          />
        ),
      },
      {
        path: Cssky_Dashboard_Routes.more,
        element: <ProtectedRoute element={<More />} />,
      },
      {
        path: Cssky_Dashboard_Routes.tickets,
        element: <ProtectedRoute element={<TicketPage />} />,
      },
      {
        path: Cssky_Dashboard_Routes.inbox,
        element: <ProtectedRoute element={<InboxPage />} />,
      },
      {
        path: Cssky_Dashboard_Routes.inboxDetail,
        element: <ProtectedRoute element={<InboxDetailsPage />} />,
      },
      {
        path: Cssky_Dashboard_Routes.history,
        element: <ProtectedRoute element={<HistoryPage />} />,
      },
      {
        path: Cssky_Dashboard_Routes.admin,
        element: (
          <ProtectedRoute
            element={<AdminPage />}
            restrictedTiers={["tier-1"]}
          />
        ),
      },
      {
        path: Cssky_Dashboard_Routes.billingInfo,
        element: (
          <ProtectedRoute
            element={<BillingInfoPage />}
            restrictedTiers={["tier-1"]}
          />
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
