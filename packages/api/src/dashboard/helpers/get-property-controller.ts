import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const getPropertyController = (propertyId: string) => {
  return getDashboardWindowStore().getRegisteredPropertyControllerComponent(
    propertyId,
  );
};
