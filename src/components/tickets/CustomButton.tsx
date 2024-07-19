import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import cn from "../../lib/utils";

interface CustomButtonProps {
  icon?: LucideIcon;
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void; 
}

const CustomButton = ({ icon: Icon, label, variant, onClick }: CustomButtonProps) => {
  const primaryStyles =
    "bg-primary text-white hover:bg-primary hover:text-white";
  const secondaryStyles =
    "bg-gray-200 text-gray-500 hover:bg-gray hover:text-gray-500";

  const buttonClass = cn(
    "flex gap-1 py-1 rounded-xl px-2 h-8 text-xs",
    onClick && "cursor-pointer", 
    variant === "primary" ? primaryStyles : secondaryStyles
  );

  return (
    <Button className={buttonClass} onClick={onClick}>
      {Icon && <Icon size={16} />}
      {label}
    </Button>
  );
};

export default CustomButton;
