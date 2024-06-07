import { DashboardWindowStore } from "../dashboard-window-store";
import { DashboardWindowStoreName } from "../../defines";

declare global {
  interface Window {
    [DashboardWindowStoreName]: DashboardWindowStore;
    __react_dashboard_api_url__: string;
  }
}

export const getDashboardWindowStore = (): DashboardWindowStore => {
  return window[DashboardWindowStoreName];
};
