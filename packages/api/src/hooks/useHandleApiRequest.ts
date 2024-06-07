import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { logError } from "@home-assistant-react/helpers/src";

export const useHandleApiRequest = (initialIsLoading = false) => {
  const isLoading = useBooleanValue(initialIsLoading);

  function wrapApiRequest<TParams extends unknown[], TResponse>(
    request: (...params: TParams) => Promise<TResponse>,
    options?: { onError: (error: unknown) => void },
  ) {
    return async (...params: TParams): Promise<TResponse | void> => {
      isLoading.setTrue();

      try {
        const response = await request(...params);
        isLoading.setFalse();

        return response;
      } catch (error) {
        isLoading.setFalse();
        logError(error);
        options?.onError?.(error);
      }
    };
  }

  return { isLoading: isLoading.value, wrapApiRequest };
};
