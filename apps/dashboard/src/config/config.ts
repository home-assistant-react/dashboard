import { registerMainPanelComponents } from "./helpers/registerMainPanelComponents";
import { DashboardWindowStoreName } from "@home-assistant-react/api/src/defines";
import { DashboardWindowStore } from "@home-assistant-react/api/src/dashboard";
import { registerPropertyControllerComponents } from "./helpers/registerMainPropertyControllers";
import { registerContexts } from "./helpers/registerContexts";

export const init = () => {
  window[DashboardWindowStoreName] = new DashboardWindowStore();

  registerContexts();
  registerMainPanelComponents();
  registerPropertyControllerComponents();
};
