import {
  Building2,
  Globe,
  LayoutDashboard,
  UserCheck,
  Sparkles,
  TrendingUp,
  Unplug,
  Mail,
  Ticket,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarItems } from "../types";
import { SidebarDesktop } from "./sidebar-desktop";
import { useAppDispatch } from "../app/hooks";
import { useToast } from "./ui/use-toast";
import { loggedOut } from "../features/auth/authActions";
import { Cssky_Dashboard_Routes } from "./store/data";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getInitials } from "../utils/getInitials";

const sidebarItems: SidebarItems = {
  theme: [
    {
      title: "KYC",
      links: [
        {
          label: "Dashboard",
          href: Cssky_Dashboard_Routes.dashboard,
          icon: LayoutDashboard,
        },
        {
          label: "Customers",
          href: Cssky_Dashboard_Routes.customersPage,
          icon: Globe,
          children: [
            {
              label: "Corporate",
              href: "/customers/corporate",
              icon: Building2,
            },
            {
              label: "Individual",
              href: "/customers/individual",
              icon: UserCheck,
            },
          ],
        },
        {
          label: "Insights",
          href: Cssky_Dashboard_Routes.insights,
          icon: TrendingUp,
        },
        {
          href: Cssky_Dashboard_Routes.tasks,
          icon: Sparkles,
          label: "Tasks",
        },
        {
          href: Cssky_Dashboard_Routes.apiBindings,
          icon: Unplug,
          label: "API Bindings",
        },
        {
          href: Cssky_Dashboard_Routes.more,
          icon: LayoutDashboard,
          label: "More",
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          href: Cssky_Dashboard_Routes.tickets,
          icon: Ticket,
          label: "Tickets",
        },
        {
          href: Cssky_Dashboard_Routes.inbox,
          icon: Mail,
          label: "Inbox",
        },
        {
          href: Cssky_Dashboard_Routes.history,
          icon: Unplug,
          label: "History",
        },
        {
          href: Cssky_Dashboard_Routes.admin,
          icon: Mail,
          label: "Admin",
        },
      ],
    },
    {
      title: "Billing",
      links: [
        {
          href: Cssky_Dashboard_Routes.billingInfo,
          icon: Ticket,
          label: "Billing Info",
        },
      ],
    },
    // Add more themes as needed
  ],
};
export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.auth);

const fullName = data?.user?.firstName && data?.user?.lastName
  ? `${data.user.firstName} ${data.user.lastName}`
  : "";
  const initials = getInitials(fullName);

  const handleLogOut = () => {
    dispatch(loggedOut())
      .then(() => {
        toast({
          title: "Success",
          description: "Logged out successfully",
        });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast({
          title: "Error",
          description: "Failed to log out",
        });
      });
  };

  if (isDesktop) {
    return (
      <SidebarDesktop sidebarItems={sidebarItems} fullName={fullName} initials={initials} user={data.user} handleLogout={handleLogOut} />
    );
  }

  return (
    <SidebarMobile sidebarItems={sidebarItems} handleLogout={handleLogOut} />
  );
}
