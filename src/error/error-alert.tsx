import React from "react";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

type AlertProps = {
  variant: "default" | "destructive";
  title?: string;
  description: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AlertError: React.FC<AlertProps> = ({
  title,
  variant,
  description,
  onClick,
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      variant,
      title: title ? title : "Uh oh! Something went wrong.",
      description,
      action: (
        <ToastAction altText="Try again" onClick={onClick}>
          Try again
        </ToastAction>
      ),
    });
  }, []);

  return null;
};

export default AlertError;
