import { LucideIcon } from "lucide-react";
import { ButtonProps } from "./ui/button";
import cn from "../lib/utils";
import { SheetClose } from "./ui/sheet";
import { useMediaQuery } from "usehooks-ts";

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
  onClick?: () => void; // Add onClick handler to props
  iconSize?: number; // Add iconSize prop to customize icon size
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  iconSize = 20,
  onClick, // Destructure onClick from props
}: Readonly<SidebarButtonProps>) {
  const isDesktop = useMediaQuery("(min-width: 1026px)");

  return (
    <div
      className={cn(
        `inline-flex h-10 py-2 px-4 items-center gap-2 justify-center lg:justify-start whitespace-nowrap rounded-md text-xs font-medium `,
        className
      )}
      onClick={onClick} // Assign onClick handler to div
    >
      {Icon && <Icon size={iconSize} />}
      <div className={`${isDesktop ? "block" : "hidden"}`}>{children}</div>
    </div>
  );
}

export function SidebarMobileButton({
  icon: Icon,
  className,
  children,
  onClick, // Destructure onClick from props
}: Readonly<SidebarButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex h-10 px-4 py-2  items-center gap-2 justify-start whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={onClick} // Assign onClick handler to div
    >
      {Icon && <Icon size={20} />}
      <div className=" mt-1 h-fit">{children}</div>
    </button>
  );
}

export function SidebarButtonSheet(props: Readonly<SidebarButtonProps>) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
