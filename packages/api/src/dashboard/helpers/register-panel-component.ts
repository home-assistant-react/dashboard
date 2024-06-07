import { PanelFC } from "@home-assistant-react/types/src";
import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const registerPanelComponent = (name: string, component: PanelFC) => {
  getDashboardWindowStore().registerPanelComponent(name, component);
};
