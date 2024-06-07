import React, { CSSProperties } from "react";
import { DashboardView, Sidebar } from "../dashboard-state";
import { UseBooleanReturn } from "../hooks";
import { Panel } from "./panel";

export interface PanelState {
  isActive?: UseBooleanReturn;
  isLoading?: UseBooleanReturn;
  isPreview?: boolean;
  panelStyle?: CSSProperties;
  updatePanelStyle?: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  panel?: Panel;
  sidebar?: Sidebar;
  view?: DashboardView;
}
