import { PanelOptions } from "../panels";

export interface DragData {
  type: string;
}

export interface NewPanelDragData extends DragData {
  type: "new-panel";
  component: string;
  options?: PanelOptions & {
    entity_id?: string;
  };
  openEdit?: boolean;
}

export interface LayerDragData extends DragData {
  type: "layer";
  panelId: string;
  groupId: string;
  viewId?: string;
  sidebarId?: string;
}

export interface LayerGroupDragData extends DragData {
  type: "layer-group";
  viewId: string;
  sidebarId: string;
}
