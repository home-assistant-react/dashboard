import { Sidebar } from "@home-assistant-react/types/src";
import { PropsWithChildren } from "react";

export interface SidebarContextMenuProps extends PropsWithChildren {
  sidebar: Sidebar;
}
