import { PanelOptions } from "../panels";

export interface PanelEditingData<T extends PanelOptions = PanelOptions> {
  panelId?: string;
  sidebarId?: string;
  viewId?: string;
  options?: T;
}
