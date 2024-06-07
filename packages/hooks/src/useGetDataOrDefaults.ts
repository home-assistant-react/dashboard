import { logError } from "@home-assistant-react/helpers/src";
import { getApiErrorMessage } from "@home-assistant-react/helpers/src/errors/getApiErrorMessage";
import React from "react";
import { useBooleanState } from "./useBooleanState";
import { useToast } from "./useToast";

export interface UseGetDataOrDefaultsOption<T> {
  showErrorToast?: boolean;
  onLoad?: (data?: T) => void;
}

export interface UseGetDataOrDefaultsReturn<T> {
  isLoading: boolean;
  isLoaded?: boolean;
  data: T | undefined;
  refresh: () => Promise<T>;
}

export default function useGetDataOrDefaults<T>(
  getData: () => Promise<T>,
  defaults?: T | undefined,
  effectDependencies?: React.DependencyList,
  options?: UseGetDataOrDefaultsOption<T>,
): UseGetDataOrDefaultsReturn<T> {
  const [state, setState] = React.useState<T | undefined>(defaults);
  const isLoading = useBooleanState(true);
  const isLoaded = useBooleanState(false);
  const { toastError } = useToast();

  React.useEffect(
    () => {
      if (!defaults) {
        isLoading.true();
        getData()
          .then((result) => {
            isLoading.false();
            isLoaded.true();
            options?.onLoad?.(result);
            return setState(result);
          })
          .catch((error) => {
            logError(error);
            if (options?.showErrorToast !== false) {
              const errorMessage = getApiErrorMessage(error);
              toastError(errorMessage);
            }
            isLoading.false();
            isLoaded.false();
          });
      }
    },
    effectDependencies ? [...effectDependencies, defaults] : [defaults],
  );

  return {
    isLoading: isLoading.state,
    isLoaded: isLoaded.state,
    data: state,
    refresh: async () => {
      const result = await getData();
      setState(result);
      return result;
    },
  };
}
