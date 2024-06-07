import {
  DashboardState,
  HassProviderState,
} from "@home-assistant-react/types/src";
import { PropsWithChildren } from "react";
export interface HassProviderProps extends PropsWithChildren {
  hassUrl: string;
  accessToken?: string;
}

export interface HassProviderInternalState
  extends Partial<
    Pick<
      HassProviderState,
      | "config"
      | "userData"
      | "areas"
      | "entitiesInfo"
      | "locale"
      | "currentUser"
    >
  > {
  loadedDashboard?: DashboardState;
}
