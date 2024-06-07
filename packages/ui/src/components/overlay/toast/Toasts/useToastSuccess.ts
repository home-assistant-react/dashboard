import { UseToastOptions } from "./Toasts.types";
import { useToast } from "./useToast";

export const useToastSuccess = () => {
  const toast = useToast();
  return (message: string, options?: UseToastOptions) => {
    return toast(message, {
      position: "bottom-center",
      ...options,
    });
  };
};
