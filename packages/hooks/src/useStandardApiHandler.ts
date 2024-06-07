import { logError } from "@home-assistant-react/helpers/src";
import { getApiErrorMessage } from "@home-assistant-react/helpers/src/errors/getApiErrorMessage";
import React, { useState } from "react";
import { useToast } from "./useToast";

export interface StandardApiHandlerOptions {
  successToastMessage?: React.ReactNode;
  onError?: (error: unknown) => void;
  onSuccess?: (response: unknown) => void;
}

export const useStandardApiHandler = (initialIsLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [isSuccess, setIsSuccess] = useState(initialIsLoading);
  const toast = useToast();

  function wrapApiRequest<TParams extends unknown[], TResponse>(
    request: (...params: TParams) => Promise<TResponse>,
    successToastMessageOrOptions?: string | StandardApiHandlerOptions,
    onError?: (error: unknown) => void,
  ) {
    return async (...params: TParams): Promise<TResponse | void> => {
      const { successToastMessage, onSuccess } =
        typeof successToastMessageOrOptions === "object"
          ? successToastMessageOrOptions
          : {
              successToastMessage: successToastMessageOrOptions,
              onSuccess: undefined,
            };

      setIsSuccess(false);

      try {
        setIsLoading(true);
        const response = await request(...params);
        setIsLoading(false);

        if (successToastMessage) {
          toast.toastSuccess(successToastMessage);
        }

        onSuccess?.(response);
        setIsSuccess(true);

        return response;
      } catch (error) {
        setIsLoading(false);

        logError(error);
        const errorMessage = getApiErrorMessage(error);
        toast.toastError(errorMessage);
        onError?.(error);
      }
    };
  }

  return {
    isLoading,
    isSuccess,
    wrapApiRequest,
  };
};
