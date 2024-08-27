import { Button } from "../ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import cn from "../../lib/utils";

interface CustomButtonProps {
  icon?: LucideIcon;
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  isLoading?: boolean;
  loadingText?: string;
}

const CustomButton = ({
  icon: Icon,
  label,
  variant,
  onClick,
  type = "button",
  isLoading = false,
  loadingText = "Loading...",
}: CustomButtonProps) => {
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
    <Button className={buttonClass} type={type} onClick={onClick}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {label}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
