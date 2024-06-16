import { useEffect } from "react";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

interface ToastActionProps {
  altText: string;
  children: React.ReactNode;
}

interface UseCustomToastProps {
  title: string;
  description?: string; // Make description optional
  action?: ToastActionProps | null;
}

export const useCustomToast = ({ title, description, action }: UseCustomToastProps) => {
  useEffect(() => {
    if (title && description !== undefined) { // Check if description is not undefined
      toast({
        title,
        description: description || "", // Use empty string if description is undefined
        action: action ? (
          <ToastAction altText={action.altText}>{action.children}</ToastAction>
        ) : undefined,
      });
    }
  }, [title, description, action]);
};
