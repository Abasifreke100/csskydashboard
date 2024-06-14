import { Dispatch, SetStateAction } from "react";
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
};

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
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
  type: "text" ;
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
  value: string;
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
