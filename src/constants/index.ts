import { useContext } from "react";
import { MyContext } from "../context";
import {
  CellData,
  dashboardCardItemsProps,
} from "../types";
import { Passport } from "../lib/icons/passport-icon";
import { ValidPassportIcon } from "../lib/icons/valid-passport-icon";
import { PasswordExpired } from "../lib/icons/passport-expired-icon";
import { CoporateIcon } from "../lib/icons/coporate-icon";
import { PersonIcon } from "@radix-ui/react-icons";
// import usersTestImage from "../assets/cSS.png";

// import pdfFile from "../assets/S-34_E_104.pdf";

export const useProviderContext = () => {
  return useContext(MyContext);
};

export const dashboardCardItems: dashboardCardItemsProps[] = [
  {
    digit: "213,423",
    tag: "Total Registrations",
  },
  {
    digit: "213,423",
    tag: "Valid Registrations",
  },
  {
    digit: "213,423",
    tag: "Invalid Registrations",
  },
  {
    digit: "213,423",
    tag: "Corporate Registrations",
  },
  {
    digit: "213,423",
    tag: "Individual Registrations",
  },
  // {
  //   digit: "213,423",
  //   tag: "Abandoned Registrations",
  // },
];

export const rowData: CellData[] = [
  {
    type: "avatar",
    data: {
      src: "https://github.com/shadcn.png",
      alt: "@shadcn",
      fallback: "JD",
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  },
  {
    type: "text",
    data: "00123",
  },
  {
    type: "empty",
    data: "Verified",
  },
  {
    type: "text",
    data: "10/10/2023",
  },
  {
    type: "text",
    data: "10/10/2023",
  },
  {
    type: "text",
    data: "Corporate",
  },
  // {
  //   type: "text",
  //   data: "$250.00",
  //   align: "right",
  // },
];

export const tableHeader = [
  "Name",
  "Registration Code",
  "Status",
  "Date Registered",
  "Date verified",
  "Type",
  // "Action",
];

export const tabs = ["All", "Verified", "Pending", "Failed"];

export function formatTitle(key: string): string {
  // Example transformation, adjust as per your specific needs
  switch (key) {
    case "totalIndividuals":
      return "Total Individuals";
    case "totalCorporates":
      return "Total Corporates";
    case "individualsToday":
      return "Individuals Today";
    case "corporatesToday":
      return "Corporates Today";
    case "individualsThisWeek":
      return "Individuals This Week";
    case "corporatesThisWeek":
      return "Corporates This Week";
    case "individualsThisMonth":
      return "Individuals This Month";
    case "corporatesThisMonth":
      return "Corporates This Month";
    case "totalRegistrations":
      return "Total Registrations";
    case "validRegistrations":
      return "Valid Registrations";
    case "invalidRegistrations":
      return "Invalid Registrations";
    case "corporateRegistrations":
      return "Corporate Registrations";
    case "individualRegistrations":
      return "Individual Registrations";
    case "abandonedRegistrations":
      return "Abandoned Registrations";
    default:
      return key; // Fallback to key if no transformation is defined
  }
}

export const icons = [
  Passport,
  ValidPassportIcon,
  PasswordExpired,
  CoporateIcon,
  PersonIcon,
];
export const keysToDisplay = [
  "totalRegistrations",
  "validRegistrations",
  "invalidRegistrations",
  "totalCorporates",
  "totalIndividuals",
];


