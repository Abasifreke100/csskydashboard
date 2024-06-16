import { LucideIcon } from "lucide-react";
import { ButtonProps } from "./ui/button";
import cn from "../lib/utils";
import { SheetClose } from "./ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
  onClick?: () => void; // Add onClick handler to props
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  onClick, // Destructure onClick from props
}: SidebarButtonProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 px-4 py-2 items-center gap-2 justify-start whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={onClick} // Assign onClick handler to div
    >
      {Icon && <Icon size={20} />}
      <div>{children}</div>
    </div>
  );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
