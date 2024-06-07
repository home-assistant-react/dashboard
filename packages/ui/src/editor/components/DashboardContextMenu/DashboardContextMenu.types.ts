import { DashboardState } from "@home-assistant-react/types/src";
import { PropsWithChildren } from "react";

export interface DashboardContextMenuProps extends PropsWithChildren {
  dashboard?: DashboardState;
}
