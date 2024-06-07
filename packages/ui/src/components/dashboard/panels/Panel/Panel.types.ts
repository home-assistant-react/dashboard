import {
  DashboardView,
  PanelProps as BasePanelProps,
  Sidebar,
} from "@home-assistant-react/types/src";
import { BoxProps } from "../../../../primitives/common";

export interface PanelProps extends BasePanelProps, BoxProps {
  sidebar?: Sidebar;
  view?: DashboardView;
}
