import { Layout } from "react-grid-layout";
import { Panel, PanelFcStyleProperties, PanelsGroupOptions } from "../panels";

export interface EditingData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  panelId?: string;
  groupId?: string;
  options?: T;
}

export interface AddingData {
  targetId?: string;
  sidebarId?: string;
  allowDrag?: boolean;
  openEditorWhenAdded?: boolean;
  onAdded?: (panel: Panel) => void;
}

export interface NewPanelData {
  panelId?: string;
  targetId?: string;
  sidebarId?: string;
  viewId?: string;
  panelComponent: string;
  panelOptions?: Record<string, unknown>;
  groupOptions?: PanelsGroupOptions;
  styles?: Record<string, PanelFcStyleProperties>;
  layoutInfo?: Partial<Pick<Layout, "h" | "w" | "x" | "y">>;
}
