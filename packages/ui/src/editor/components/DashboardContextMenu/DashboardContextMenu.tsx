import { useDashboardEditor } from "@home-assistant-react/api/src";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuTrigger,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "../../../components";
import { ArrangePanelsContextItems } from "../context-menu-items/ArrangePanelsContextItems";
import { CreateNewPanelWithGroupContextItems } from "../context-menu-items/CreateNewPanelWithGroupContextItems";
import { DashboardSettingsContextItems } from "../context-menu-items/DashboardSettingsContextItems";
import { ViewSettingsContextItems } from "../context-menu-items/ViewSettingsContextItems";
import { DashboardContextMenuProps } from "./DashboardContextMenu.types";

export const DashboardContextMenu: React.FC<DashboardContextMenuProps> = ({
  children,
}) => {
  const { editorModalDisclosure } = useDashboardEditor();
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>New</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem icon={"Blocks"}>Panel</ContextMenuItem>
            <ContextMenuItem
              icon={"LayoutPanelTop"}
              onClick={() => {
                editorModalDisclosure.open({ modal: "view" });
              }}
            >
              View
            </ContextMenuItem>
            <ContextMenuItem
              icon={"PanelLeftDashed"}
              onClick={() => {
                editorModalDisclosure.open({ modal: "sidebar" });
              }}
            >
              Sidebar
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ArrangePanelsContextItems />
        <ContextMenuSeparator />
        <CreateNewPanelWithGroupContextItems />
        <ContextMenuSeparator />
        <ViewSettingsContextItems />
        <ContextMenuSeparator />
        <DashboardSettingsContextItems />
      </ContextMenuContent>
    </ContextMenu>
  );
};

DashboardContextMenu.displayName = "DashboardContextMenu";
