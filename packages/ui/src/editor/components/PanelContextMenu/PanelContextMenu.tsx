import React from "react";
import { ArrangePanelsContextItems } from "../context-menu-items/ArrangePanelsContextItems";
import { CreateNewPanelWithGroupContextItems } from "../context-menu-items/CreateNewPanelWithGroupContextItems";
import { PanelContextMenuProps } from "./PanelContextMenu.types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../../components";
import {
  useDashboard,
  useDashboardEditor,
  usePanel,
} from "@home-assistant-react/api/src";
import { getPanelGroupSwiper } from "@home-assistant-react/helpers/src";

export const PanelContextMenu: React.FC<PanelContextMenuProps> = ({
  children,
  panel,
  group,
  sidebar,
  isDisabled,
}) => {
  const {
    startPanelEditing,
    isArranging,
    panelsCreationDisclosure,
    deletePanel,
    deleteGroup,
    deleteGroupFromSidebar,
    deletePanelFromSidebar,
    duplicatePanel,
  } = useDashboardEditor();
  const dashboard = useDashboard();

  const _panel = usePanel();

  const handleEditPanel = () => {
    startPanelEditing({
      panelId: panel.id,
      //groupId: group.i,
      options: panel.options,
      sidebarId: sidebar?.id,
      viewId: dashboard.selectedDashboardView,
    });
  };

  const handleDeletePanel = () => {
    if (sidebar?.id) {
      deletePanelFromSidebar(panel, sidebar.id);
      return;
    }
    deletePanel(panel);
  };

  const handleDeleteGroup = () => {
    if (!group?.i) return null;
    if (sidebar?.id) {
      deleteGroupFromSidebar(group.i, sidebar.id);
      return;
    }
    deleteGroup(group.i);

    return;
  };

  const handleDuplicatePanel = () => {
    duplicatePanel(panel, group);
  };

  const handleAddPanelToGroup = () => {
    panel.component;
    panelsCreationDisclosure.open({
      allowDrag: false,
      targetId: group?.i,
      sidebarId: sidebar?.id,
      onAdded: () => {
        if (!group?.i) return;
        const swiper = getPanelGroupSwiper(group?.i);
        if (!swiper) return;
        setTimeout(() => {
          swiper.slideTo(swiper.slides.length);
        }, 100);
      },
    });
    isArranging.setFalse();
  };

  if (!panel) return;

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={isDisabled || _panel.isPreview} asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ArrangePanelsContextItems />
        <ContextMenuSeparator />
        <ContextMenuItem mdiIcon={"pencil"} onClick={handleEditPanel}>
          Edit panel
        </ContextMenuItem>
        <ContextMenuItem mdiIcon={"contentCopy"} onClick={handleDuplicatePanel}>
          Duplicate panel
        </ContextMenuItem>
        {group && (
          <ContextMenuItem
            mdiIcon={"shapeSquarePlus"}
            onClick={handleAddPanelToGroup}
          >
            Add panel to this group
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <CreateNewPanelWithGroupContextItems />
        <ContextMenuSeparator />
        <ContextMenuItem
          mdiIcon={"trashCan"}
          variant={"danger"}
          onClick={handleDeletePanel}
        >
          Delete panel
        </ContextMenuItem>
        {group && group.panels?.length > 1 && (
          <ContextMenuItem
            mdiIcon={"deleteVariant"}
            variant={"danger"}
            onClick={handleDeleteGroup}
          >
            Delete group
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

PanelContextMenu.displayName = "PanelContextMenu";
