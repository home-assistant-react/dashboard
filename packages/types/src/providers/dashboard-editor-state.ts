import { AddingData, NewPanelData } from "../editor";
import { Panel, PanelsGroup } from "../panels";
import { PanelEditingData } from "../editor/panel-editing-data";
import { UseBooleanReturn, UseDisclosureReturn } from "../hooks";
import { DashboardView, DraggingPanelInfo } from "../dashboard-state";
import React from "react";

export interface DeleteOptions {
  askForConfirmation?: boolean;
  onConfirm?: () => void;
}

export interface ModalDisclosureData {
  modal: "sidebar" | "panel" | "view";
  sidebarId?: string;
  viewId?: string;
}

export interface DashboardEditorState {
  isEditing: boolean;
  isArranging: UseBooleanReturn;
  startPanelEditing: (data?: PanelEditingData) => void;
  startAdding: (data?: AddingData) => void;
  endAdding: () => void;
  addNewPanel: (data: NewPanelData, openEdit?: boolean) => void;
  duplicatePanel: (panel: Panel, group?: PanelsGroup) => void;
  deletePanel: (panel: Panel, options?: DeleteOptions) => void;
  deletePanelFromSidebar: (
    panel: Panel,
    sidebarId: string,
    options?: DeleteOptions,
  ) => void;
  deleteGroup: (groupId: string, options?: DeleteOptions) => void;
  deleteView: (view: DashboardView, options?: DeleteOptions) => void;
  deleteSidebar: (sidebarId: string, options?: DeleteOptions) => void;
  deleteGroupFromSidebar: (
    groupId: string,
    sidebarId: string,
    options?: DeleteOptions,
  ) => void;
  editingPanel?: PanelsGroup;
  addingData?: AddingData;
  panelsEditorDisclosure: UseDisclosureReturn<PanelEditingData | undefined>;
  panelsCreationDisclosure: UseDisclosureReturn<AddingData | undefined>;
  setDraggingPanel: React.Dispatch<
    React.SetStateAction<DraggingPanelInfo | undefined>
  >;
  draggingPanel?: DraggingPanelInfo;
  editorModalDisclosure: UseDisclosureReturn<ModalDisclosureData>;
}
