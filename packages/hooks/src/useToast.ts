import { ExternalToast, toast } from "sonner";
import React from "react";

export const useToastSuccess = () => {
  return (message: React.ReactNode, options?: ExternalToast) => {
    toast.success(message, options);
  };
};

export const useToastError = () => {
  return (message: React.ReactNode, options?: ExternalToast) => {
    toast.error(message, options);
  };
};

export const useToast = () => {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const customToast = toast.custom;
  const dismiss = toast.dismiss;

  return {
    toastSuccess,
    toastError,
    customToast,
    dismiss,
    toastServerError: (
      _: unknown,
      message?: React.ReactNode,
      options?: ExternalToast,
    ) => toastError(message || "Something went wrong", options), //TODO fix this
  };
};
