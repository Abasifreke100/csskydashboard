import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ApiResponse {
  [key: string]: unknown;
}

export type MyContextProps = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
export interface SidebarItems {
  theme: Theme[];
  extras?: ReactNode;
}

export interface Theme {
  title: string;
  links: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: SidebarItem[];
}

export interface dashboardCardItemsProps {
  digit: string;
  tag: string;
}

export interface AvatarData {
  type: string;
  data: {
    src: string;
    alt: string;
    fallback: string;
    name: string;
    email: string;
  };
}

export interface TextData {
  type: "text";
  data: string;
  align?: "left" | "right" | "center";
}

export interface EmptyCell {
  type: "empty";
  data: string;
}

export type CellData = AvatarData | TextData | EmptyCell;

export interface ProfileInfoProps {
  label: string;
  value: string | number;
  badgeClassName: string;
}

export type ContentDetail = {
  detailName: string;
  detailInfo: string;
  detailDescription?: string;
};

export type CardData = {
  title: string;
  content?: ContentDetail[];
  image?: string;
};

export interface User {
  _id: string;
  role: string;
  email: string;
  message?: string;
}

export interface UsersResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
}

export interface CustomerIndividualResponse {
  success: boolean;
  data: Data;
  message: null;
  type: "individual";
}

export interface Data {
  pendingIndividual: number;
  response: Response[];
  verifiedIndividual: number;
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  currentPage: number;
  size: number;
}

export interface Response {
  _id: string;
  title: string;
  firstName: string;
  surName: string;
  dob: string;
  nationality: string;
  gender: string;
  employmentStatus: string;
  email: string;
  phone: string;
  isNinVerified: boolean;
  alternativePhone: string;
  nin?: number;
  residential: Residential;
  documents: Documents;
  biometrics: Biometrics;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Biometrics {
  selfie: string;
  fingerPrint: boolean;
}

export interface Documents {
  identity: string;
  documentType: string;
}

export interface Residential {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  landMark: string;
}

export interface Corporate {
  _id: string;
  companyName: string;
  companyWebsite: string;
  registrationNumber: string;
  companyPhoneNumber: string;
  address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    landMark: string;
  };
  contact: {
    nameOfContact: string;
    designation: string;
    phoneNumber: string;
    email: string;
  };
  director: {
    directorName: string;
    designation: string;
    phoneNumber: string;
    email: string;
    nin: number | null;
    isNinVerified: boolean;
  };
  documents: {
    type: string;
    identity: string;
  };
  bioMetrics: {
    selfie: string;
    fingerPrint: boolean;
  };
  createdAt: string; // Assuming createdAt and updatedAt are strings in ISO format
  updatedAt: string;
  __v: number;
}

export interface CorporateResponse {
  success: boolean;
  data: {
    pendingCorporate: number;
    response: Corporate[];
    verifiedCorporate: number;
    pagination: {
      total: number;
      currentPage: number;
      size: number;
    };
  };
  type: "corporate";
  message: string | null;
}

export type CustomerResponse = CustomerIndividualResponse | CorporateResponse;

export type FieldValue =
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | null
  | undefined;

export interface OverviewData {
  totalIndividuals: number;
  totalCorporates: number;
  individualsToday: number;
  corporatesToday: number;
  corporatesThisMonth: number;
  corporatesThisWeek: number;
  individualsThisMonth: number;
  individualsThisWeek: number;
}

export interface TransformedOverviewData {
  totalRegistrations: number;
  validRegistrations: number;
  invalidRegistrations: number;
  totalCorporates: number;
  totalIndividuals: number;
}
