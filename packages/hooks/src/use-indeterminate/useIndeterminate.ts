import { useBooleanValue } from "../use-boolean-value";
import React from "react";

export interface UseIndeterminateReturn {
  isIndeterminate: boolean;
  activate: () => void;
  cancel: () => void;
}

export interface UseIndeterminateOptions {
  timeoutDelay?: number;
  startDelay?: number;
}

export const useIndeterminate = (
  dep: unknown,
  options: UseIndeterminateOptions = {},
): UseIndeterminateReturn => {
  const { timeoutDelay = 2500, startDelay = 100 } = options;
  const isIndeterminate = useBooleanValue();
  const endDelayRef = React.useRef<ReturnType<typeof setTimeout>>();
  const startDelayRef = React.useRef<ReturnType<typeof setTimeout>>();
  const cancelTimeout = () => {
    if (endDelayRef.current) {
      clearTimeout(endDelayRef.current);
    }
    if (startDelayRef.current) {
      clearTimeout(startDelayRef.current);
    }
  };

  React.useEffect(() => {
    isIndeterminate.setFalse();
    cancelTimeout();

    return () => {
      if (endDelayRef.current) {
        cancelTimeout();
      }
    };
  }, [dep]);

  const _activate = () => {
    isIndeterminate.setTrue();
    endDelayRef.current = setTimeout(() => {
      isIndeterminate.setFalse();
    }, timeoutDelay);
  };

  const activate = () => {
    if (startDelay) {
      startDelayRef.current = setTimeout(_activate, startDelay);
      return;
    }
    _activate();
  };

  const cancel = () => {
    cancelTimeout();
    isIndeterminate.setFalse();
  };

  return {
    isIndeterminate: isIndeterminate.value,
    activate,
    cancel,
  };
};
