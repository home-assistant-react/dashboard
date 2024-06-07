import { PanelsGroup, Sidebar } from "@home-assistant-react/types/src";
import { BoxProps } from "../../../../primitives/common";

export interface PanelsGroupProps extends BoxProps {
  group: PanelsGroup;
  sidebar?: Sidebar;
}
