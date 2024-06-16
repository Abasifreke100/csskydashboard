import {
  Building2,
  Globe,
  LayoutDashboard,
  MoreHorizontal,
  UserCheck,
  // Sparkles,
  // TrendingUp,
  // Unplug
} from "lucide-react";
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarItems } from "../types";
import { SidebarDesktop } from "./sidebar-desktop";
import { useAppDispatch } from "../app/hooks";
import { useToast } from "./ui/use-toast";
import { loggedOut } from "../features/auth/authActions";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      label: "Customers",
      href: "/customers",
      icon: Globe,
      children: [
        { label: "Cooperate", href: "/customers/corporate", icon: Building2 },
        { label: "Individual", href: "/customers/individual", icon: UserCheck },
        // Add more customer links as needed
      ],
    },
    // { label: 'Insights', href: '/insights', icon: TrendingUp },
    // {
    //   href: '/tasks',
    //   icon: Sparkles,
    //   label: 'Tasks',
    // },
    // {
    //   href: '/api-bindings',
    //   icon: Unplug,
    //   label: 'API Bindings',
    // },
    // {
    //   href: '/more',
    //   icon: Globe,
    //   label: 'More',
    // }
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const { toast } = useToast()
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
    return <SidebarDesktop sidebarItems={sidebarItems} handleLogout={handleLogOut} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} handleLogout={handleLogOut} />;
}
