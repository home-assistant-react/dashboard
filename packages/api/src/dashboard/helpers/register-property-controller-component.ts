import { PropertyControllerFc } from "@home-assistant-react/types/src";
import { getDashboardWindowStore } from "./get-dashboard-window-store";

export const registerPropertyControllerComponent = (
  name: string,
  component: PropertyControllerFc,
) => {
  getDashboardWindowStore().registerPropertyControllerComponent(
    name,
    component,
  );
};
