import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const getRegisteredContext = <T>(contextName: string) => {
  return getDashboardWindowStore().getRegisteredContext<T>(contextName);
};
