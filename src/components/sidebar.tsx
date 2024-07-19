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

const sidebarItems: SidebarItems = {
  theme: [
    {
      title: "KYC",
      links: [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        {
          label: "Customers",
          href: "/customers",
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
        { label: "Insights", href: "/insights", icon: TrendingUp },
        {
          href: "#",
          icon: Sparkles,
          label: "Tasks",
        },
        {
          href: "/api-bindings",
          icon: Unplug,
          label: "API Bindings",
        },
        {
          href: "/more",
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
        }
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
      <SidebarDesktop sidebarItems={sidebarItems} handleLogout={handleLogOut} />
    );
  }

  return (
    <SidebarMobile sidebarItems={sidebarItems} handleLogout={handleLogOut} />
  );
}
