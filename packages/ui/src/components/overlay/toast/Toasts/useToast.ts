import { toast } from "sonner";
import { UseToastOptions } from "./Toasts.types";
export const useToast = () => {
  return (message: string, options?: UseToastOptions) => {
    return toast(message, {
      duration: 4000,
      position: "top-right",
      ...options,
    });
  };
};
