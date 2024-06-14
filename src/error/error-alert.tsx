import React from "react";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

type AlertProps = {
  variant: "default" | "destructive";
  title?: string;
  description: string;
};

const AlertError: React.FC<AlertProps> = ({ variant, description }) => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      variant,
      title: "Uh oh! Something went wrong.",
      description,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }, []);

  return null;
};

export default AlertError;
