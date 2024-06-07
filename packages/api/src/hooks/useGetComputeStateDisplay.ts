import { computeStateDisplayFromEntityAttributes } from "@home-assistant-react/helpers/src/home-assistant";
import { HassConfig } from "home-assistant-js-websocket";
import {
  FrontendLocaleData,
  HassEntityRegistryDisplayEntry,
  HassEntityState,
  LocalizeFunc,
  HassConfig as HassConfigType,
} from "@home-assistant-react/types/src";
import { useHass } from "./providers";

export const useGetComputeStateDisplay = () => {
  const { config, userData, locale } = useHass();

  function localize(id: string) {
    if (!locale) return id;
    if (id in locale) return locale[id];
    return id;
  }

  return (
    entityState?: HassEntityState,
    options?: {
      localize?: LocalizeFunc;
      locale?: FrontendLocaleData;
      config?: HassConfig;
      entity?: HassEntityRegistryDisplayEntry | undefined;
      state?: string;
    },
  ) => {
    if (!entityState) return "";

    return computeStateDisplayFromEntityAttributes(
      options?.localize || localize,
      options?.locale || userData?.language,
      (options?.config || config) as HassConfigType,
      entityState,
      entityState.entity_id,
      entityState.attributes,
      options?.state !== undefined ? options?.state : entityState.state,
    );
  };
};
