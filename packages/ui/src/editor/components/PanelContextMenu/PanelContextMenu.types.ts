import { Panel, PanelsGroup, Sidebar } from "@home-assistant-react/types/src";
import { PropsWithChildren } from "react";

export interface PanelContextMenuProps extends PropsWithChildren {
  panel: Panel;
  group?: PanelsGroup;
  sidebar?: Sidebar;
  isDisabled?: boolean;
}
