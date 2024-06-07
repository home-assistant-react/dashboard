import { RefObject } from "react";
import {
  HassAreas,
  HassConfig,
  HassCurrentUserData,
  HassEntitiesInfo,
  HassEntitiesState,
  HassUserData,
} from "../home-assistant";
import { Connection } from "home-assistant-js-websocket";
import { DashboardState } from "../dashboard-state";
import { CustomSvgIcons } from "../ui";
import { CustomImages } from "../ui/custom-images";

export interface HassProviderState {
  connection: Connection;
  areas: HassAreas;
  entitiesInfo: HassEntitiesInfo;
  config: HassConfig;
  userData?: HassUserData;
  currentUser?: HassCurrentUserData;
  locale?: Record<string, string>;
  hasAuthError?: boolean;
  isLoaded?: boolean;
  loadedDashboard?: DashboardState;
  customIcons?: CustomSvgIcons;
  customImages?: CustomImages;
  reloadCustomIcons: () => Promise<CustomSvgIcons>;
  reloadCustomImages: () => Promise<CustomImages>;
  selectedDashboard?: string | null;
  setSelectedDashboard?: (dashboard: string, save?: boolean) => void;
  loadedEntities: RefObject<HassEntitiesState>;
}
