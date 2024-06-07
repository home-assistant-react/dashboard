import { useDashboardEditor } from "@home-assistant-react/api/src";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../../components";
import { SidebarContextMenuProps } from "./SidebarContextMenu.types";

export const SidebarContextMenu: React.FC<SidebarContextMenuProps> = ({
  sidebar,
  children,
}) => {
  const { isArranging, panelsCreationDisclosure, editorModalDisclosure } =
    useDashboardEditor();

  const handleAddPanelToGroup = () => {
    panelsCreationDisclosure.open({
      allowDrag: false,
      sidebarId: sidebar.id,
      onAdded: () => {},
    });
    isArranging.setFalse();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={"Plus"} onClick={handleAddPanelToGroup}>
          Add new group with panel
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem
          icon={"Settings"}
          onClick={() => {
            editorModalDisclosure.open({
              modal: "sidebar",
              sidebarId: sidebar.id,
            });
          }}
        >
          Sidebar settings
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

SidebarContextMenu.displayName = "SidebarContextMenu";
