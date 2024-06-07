import { HassConfig } from "home-assistant-js-websocket";
import {
  FrontendLocaleData,
  HassEntityRegistryDisplayEntry,
  HassEntityState,
  LocalizeFunc,
} from "@home-assistant-react/types/src";
import { useGetComputeStateDisplay } from "./useGetComputeStateDisplay";

export const useComputeStateDisplay = (
  entityState?: HassEntityState,
  options?: {
    localize?: LocalizeFunc;
    locale?: FrontendLocaleData;
    config?: HassConfig;
    entity?: HassEntityRegistryDisplayEntry | undefined;
    state?: string;
  },
) => {
  const computeStateDisplay = useGetComputeStateDisplay();

  return computeStateDisplay(entityState, options);
};
