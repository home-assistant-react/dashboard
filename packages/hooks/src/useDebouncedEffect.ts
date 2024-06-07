import React from "react";

export interface UseDebounceEffectReturn {
  requestLoading: () => void;
}
export interface UseDebounceEffectOptions {
  delay?: number;
  timeout?: number;
}

export const useDebouncedEffect = (
  startCallback: () => void,
  endCallback: () => void,
  deps: React.DependencyList,
  options?: UseDebounceEffectOptions,
): UseDebounceEffectReturn => {
  const delay = options?.delay || 0;
  const timeout = options?.timeout || 10000;

  const [delayTimeout, setDelayTimeout] = React.useState<number | null>(null);
  const [timeoutTimeout, setTimeoutTimeout] = React.useState<number | null>(
    null,
  );

  const requestLoading = () => {
    setDelayTimeout(
      window.setTimeout(() => {
        startCallback();
        if (timeout > 0) {
          setTimeoutTimeout(
            window.setTimeout(() => {
              endCallback();
            }, timeout),
          );
        }
      }, delay),
    );
  };

  React.useEffect(() => {
    const clear = () => {
      if (delayTimeout) {
        window.clearTimeout(delayTimeout);
      }
      if (timeoutTimeout) {
        window.clearTimeout(timeoutTimeout);
      }
    };

    endCallback();
    clear();

    return clear;
  }, deps);

  return {
    requestLoading,
  };
};
