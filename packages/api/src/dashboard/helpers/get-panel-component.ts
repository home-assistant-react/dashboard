import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const getPanelComponent = (panelId: string) => {
  return getDashboardWindowStore().getRegisteredPanelComponent(panelId);
};
