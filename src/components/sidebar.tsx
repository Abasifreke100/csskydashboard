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

type TierKey = "tier-1" | "tier-2" | "tier-3" | "tier-4" | "null";

const tierAccess: Record<TierKey, string[]> = {
  "tier-1": ["API Bindings", "Admin", "Billing Info"],
  "tier-2": [], // Tier 2 users have no restrictions
  "tier-3": [], // Tier 3 users have no restrictions
  "tier-4": [], // Tier 3 users have no restrictions
  null: [
    "API Bindings",
    "Admin",
    "Billing Info",
    "History",
    "Inbox",
    "Tickets",
    "More",
    "Tasks",
    "Insights",
  ],
};

// Function to filter sidebar items based on tier
const filterSidebarItems = (
  items: SidebarItems,
  userTier: string | null
): SidebarItems => {
  // Ensure userTier is handled correctly
  const validTier: TierKey =
    userTier && userTier in tierAccess ? (userTier as TierKey) : "null";
  const restrictedItems = tierAccess[validTier] || [];

  return {
    theme: items.theme
      .map((theme) => ({
        ...theme,
        links: theme.links.filter(
          (link) => !restrictedItems.includes(link.label)
        ),
      }))
      .filter((theme) => theme.links.length > 0), // Remove theme if all links are restricted
  };
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.auth);

  const fullName =
    data?.user?.firstName && data?.user?.lastName
      ? `${data.user.firstName} ${data.user.lastName}`
      : "";
  const initials = getInitials(
    fullName !== "" ? fullName : (data?.user?.role as string)
  );
  const userTier = data.user?.tier ?? null;
  const filteredSidebarItems = filterSidebarItems(sidebarItems, userTier);
  console.log(filteredSidebarItems);

  const handleLogOut = () => {
    dispatch(loggedOut());
  };

  if (isDesktop) {
    return (
      <SidebarDesktop
        sidebarItems={filteredSidebarItems}
        fullName={fullName}
        initials={initials}
        user={data.user}
        handleLogout={handleLogOut}
      />
    );
  }

  return (
    <SidebarMobile
      sidebarItems={filteredSidebarItems}
      handleLogout={handleLogOut}
      fullName={fullName}
      initials={initials}
      user={data.user}
    />
  );
}
