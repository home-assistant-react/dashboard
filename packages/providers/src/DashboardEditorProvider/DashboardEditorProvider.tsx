import { DeleteConfirmModal } from "@home-assistant-react/ui/src";
import React from "react";
import {
  useBooleanValue,
  useDisclosure,
} from "@home-assistant-react/hooks/src";
import {
  AddingData,
  DashboardEditorState,
  DashboardView,
  DraggingPanelInfo,
  ModalDisclosureData,
  Panel,
} from "@home-assistant-react/types/src";
import { useDashboard } from "@home-assistant-react/api/src";
import { DashboardEditorProviderProps } from "./DashboardEditorProvider.types";
import { PanelEditingData } from "@home-assistant-react/types/src/editor/panel-editing-data";

export const DashboardEditorContext = React.createContext<
  DashboardEditorState | undefined
>(undefined);

export const DashboardEditorProvider: React.FC<
  DashboardEditorProviderProps
> = ({ children }) => {
  const dashboard = useDashboard();
  const [draggingPanel, setDraggingPanel] = React.useState<DraggingPanelInfo>();
  const panelsEditorDisclosure = useDisclosure<PanelEditingData>();
  const panelsCreationDisclosure = useDisclosure<AddingData>();
  const editorModalDisclosure = useDisclosure<ModalDisclosureData>();
  const isArranging = useBooleanValue(false);
  const isEditing = useBooleanValue(false);
  const isDeletePanelOpen = useDisclosure<{
    panel: Panel;
    onConfirm?: () => void;
    sidebarId?: string;
  }>();
  const isDeleteGroupOpen = useDisclosure<{
    groupId: string;
    sidebarId?: string;
    onConfirm?: () => void;
  }>();
  const deleteViewDisclosure = useDisclosure<{
    view: DashboardView;
    onConfirm?: () => void;
  }>();
  const deleteSidebarDisclosure = useDisclosure<{
    sidebarId: string;
    onConfirm?: () => void;
  }>();

  const [addingData] = React.useState<AddingData | undefined>();

  const startPanelEditing: DashboardEditorState["startPanelEditing"] = (
    editingData,
  ) => {
    panelsEditorDisclosure.open(editingData);
  };

  const startAdding: DashboardEditorState["startAdding"] = (data) => {
    panelsCreationDisclosure.open(data);
  };

  const endAdding: DashboardEditorState["endAdding"] = () => {
    panelsCreationDisclosure.close();
  };

  const addNewPanel: DashboardEditorState["addNewPanel"] = (
    data,
    openEdit = false,
  ) => {
    dashboard.addPanel(
      { ...panelsCreationDisclosure.data, ...data },
      (result) => {
        if (panelsCreationDisclosure.data?.onAdded) {
          panelsCreationDisclosure.data?.onAdded(result.panel);
        }
        panelsCreationDisclosure.close();
        if (openEdit) {
          panelsEditorDisclosure.open({ panelId: result.panel.id });
        }
      },
    );
  };

  const duplicatePanel: DashboardEditorState["duplicatePanel"] = (
    panel,
    group,
  ) => {
    addNewPanel({
      panelComponent: panel.component,
      panelOptions: panel.options,
      styles: panel.styles,
      viewId: dashboard.selectedDashboardView || undefined,
      layoutInfo: group
        ? {
            h: group.h,
            w: group.w,
          }
        : undefined,
    });
  };

  const deletePanel: DashboardEditorState["deletePanel"] = (panel, options) => {
    if (options?.askForConfirmation !== false) {
      isDeletePanelOpen.open({ panel, onConfirm: options?.onConfirm });
      return;
    }
    if (dashboard.selectedDashboardView)
      dashboard.deletePanel(dashboard.selectedDashboardView, panel);
  };

  const deletePanelFromSidebar: DashboardEditorState["deletePanelFromSidebar"] =
    (panel, sidebarId: string, options) => {
      if (options?.askForConfirmation !== false) {
        isDeletePanelOpen.open({
          panel,
          onConfirm: options?.onConfirm,
          sidebarId,
        });
        return;
      }
      dashboard.deletePanelFromSidebar(panel, sidebarId);
    };

  const deleteGroup: DashboardEditorState["deleteGroup"] = (
    groupId,
    options,
  ) => {
    if (options?.askForConfirmation !== false) {
      isDeleteGroupOpen.open({ groupId, onConfirm: options?.onConfirm });
      return;
    }
    if (dashboard.selectedDashboardView)
      dashboard.deleteGroup(dashboard.selectedDashboardView, groupId);
  };

  const deleteView: DashboardEditorState["deleteView"] = (view, options) => {
    if (options?.askForConfirmation !== false) {
      deleteViewDisclosure.open({ view, onConfirm: options?.onConfirm });
      return;
    }
    dashboard.deleteView(view.id);
  };

  const deleteSidebar: DashboardEditorState["deleteSidebar"] = (
    sidebarId,
    options,
  ) => {
    if (options?.askForConfirmation !== false) {
      deleteSidebarDisclosure.open({
        sidebarId,
        onConfirm: options?.onConfirm,
      });
      return;
    }
    dashboard.deleteSidebar(sidebarId);
  };

  const deleteGroupFromSidebar: DashboardEditorState["deleteGroupFromSidebar"] =
    (groupId, sidebarId, options) => {
      if (options?.askForConfirmation !== false) {
        isDeleteGroupOpen.open({
          groupId,
          onConfirm: options?.onConfirm,
          sidebarId,
        });
        return;
      }
      dashboard.deleteGroupFromSidebar(groupId, sidebarId);
    };

  const handlePanelDeleteConfirm = () => {
    if (!isDeletePanelOpen.data) return;
    if (isDeletePanelOpen.data.sidebarId) {
      deletePanelFromSidebar(
        isDeletePanelOpen.data.panel,
        isDeletePanelOpen.data.sidebarId,
        { askForConfirmation: false },
      );
      isDeletePanelOpen.close();
      return;
    }
    deletePanel(isDeletePanelOpen.data.panel, { askForConfirmation: false });
    isDeletePanelOpen.data.onConfirm?.();
    isDeletePanelOpen.close();
  };

  const handleGroupDeleteConfirm = () => {
    if (!isDeleteGroupOpen.data) return;
    if (isDeleteGroupOpen.data.sidebarId) {
      deleteGroupFromSidebar(
        isDeleteGroupOpen.data.groupId,
        isDeleteGroupOpen.data.sidebarId,
        { askForConfirmation: false },
      );
      isDeleteGroupOpen.close();
      return;
    }
    deleteGroup(isDeleteGroupOpen.data.groupId, { askForConfirmation: false });
    isDeleteGroupOpen.data.onConfirm?.();
    isDeleteGroupOpen.close();
  };

  const handleViewDeleteConfirm = () => {
    if (!deleteViewDisclosure.data) return;
    dashboard.deleteView(deleteViewDisclosure.data.view.id);
    deleteViewDisclosure.data.onConfirm?.();
    deleteViewDisclosure.close();
  };

  const handleSidebarDeleteConfirm = () => {
    if (!deleteSidebarDisclosure.data) return;
    dashboard.deleteSidebar(deleteSidebarDisclosure.data.sidebarId);
    deleteSidebarDisclosure.data.onConfirm?.();
    deleteSidebarDisclosure.close();
  };

  return (
    <DashboardEditorContext.Provider
      value={{
        isEditing: isEditing.value,
        isArranging: isArranging,
        panelsEditorDisclosure,
        panelsCreationDisclosure,
        startPanelEditing,
        startAdding,
        addNewPanel,
        duplicatePanel,
        addingData,
        endAdding,
        deletePanel,
        deleteGroup,
        deleteGroupFromSidebar,
        deletePanelFromSidebar,
        deleteView,
        deleteSidebar,
        draggingPanel,
        setDraggingPanel,
        editorModalDisclosure,
      }}
    >
      {children}
      <DeleteConfirmModal
        onConfirm={handlePanelDeleteConfirm}
        title={"Do you really want to delete this panel?"}
        message={
          <>
            You will lose all the options and styles you have set for this
            panel.
            <br />
            <strong>This action cannot be undone.</strong>
          </>
        }
        isOpen={isDeletePanelOpen.isOpen}
        onOpenChange={isDeletePanelOpen.setOpen}
      />
      <DeleteConfirmModal
        onConfirm={handleGroupDeleteConfirm}
        title={"Do you really want to delete this group?"}
        message={
          <>
            Do you really want to delete this group? All the panels inside this
            group will be deleted too.
            <br />
            <strong>This action cannot be undone.</strong>
          </>
        }
        confirmText={"DELETE GROUP"}
        isOpen={isDeleteGroupOpen.isOpen}
        onOpenChange={isDeleteGroupOpen.setOpen}
      />
      <DeleteConfirmModal
        onConfirm={handleViewDeleteConfirm}
        title={"Do you really want to delete this view?"}
        message={
          <>
            Do you really want to delete this view? All the panels and groups
            inside this view will be deleted too.
            <br />
            <strong>This action cannot be undone.</strong>
          </>
        }
        confirmText={`DELETE VIEW ${deleteViewDisclosure.data?.view.name}`}
        isOpen={deleteViewDisclosure.isOpen}
        onOpenChange={deleteViewDisclosure.setOpen}
      />
      <DeleteConfirmModal
        onConfirm={handleSidebarDeleteConfirm}
        title={"Do you really want to delete this sidebar?"}
        message={
          <>
            Do you really want to delete this sidebar? All the panels and groups
            inside this sidebar will be deleted too.
            <br />
            <strong>This action cannot be undone.</strong>
          </>
        }
        confirmText={"DELETE SIDEBAR"}
        isOpen={deleteSidebarDisclosure.isOpen}
        onOpenChange={deleteSidebarDisclosure.setOpen}
      />
    </DashboardEditorContext.Provider>
  );
};
