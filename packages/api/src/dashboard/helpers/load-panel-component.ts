import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const loadPanelComponent = (url: string) => {
  getDashboardWindowStore().loadPanelComponent(url);
};
