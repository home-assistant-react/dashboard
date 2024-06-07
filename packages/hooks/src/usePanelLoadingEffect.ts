import { usePanel } from "@home-assistant-react/api/src";
import React from "react";
import {
  useDebouncedEffect,
  UseDebounceEffectOptions,
} from "./useDebouncedEffect";

export const usePanelLoadingEffect = (
  deps: React.DependencyList,
  options?: UseDebounceEffectOptions,
) => {
  const panel = usePanel();
  return useDebouncedEffect(
    () => {
      panel.isLoading?.setTrue();
    },
    () => {
      panel.isLoading?.setFalse();
    },
    deps,
    options,
  );
};
