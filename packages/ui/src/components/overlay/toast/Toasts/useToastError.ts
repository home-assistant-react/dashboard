import { useToast } from "./useToast";
import { UseToastOptions } from "./Toasts.types";

export const useToastError = () => {
  const toast = useToast();
  return (message: string, options?: UseToastOptions) => {
    return toast(message, {
      position: "bottom-center",
      ...options,
    });
  };
};
