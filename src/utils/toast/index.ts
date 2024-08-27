import {toast } from 'sonner'
import { capitalize } from "../text";

interface ToastParams {
  title: string;
  message: string;
}

export const successToast = ({ title, message }: ToastParams) => {
  const heading = title.split("_").join(" ");
  toast.success(capitalize(heading), {
    description: message,
    important: true,
    closeButton: true,
  });
};

export const errorToast = ({ title, message }: ToastParams) => {
  const heading = title.split("_").join(" ");
  toast.error(capitalize(heading), {
    description: message,
    important: true,
    closeButton: true,
  });
};
