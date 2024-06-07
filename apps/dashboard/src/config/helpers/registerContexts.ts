import { getDashboardWindowStore } from "@home-assistant-react/api/src/dashboard";
import {
  ApiContext,
  DashboardContext,
  DashboardEditorContext,
  HassContext,
  LocaleContext,
  PanelContext,
  PanelEditorContext,
  StyleEditorContext,
} from "@home-assistant-react/providers/src";
import { PluginsContext } from "@home-assistant-react/providers/src/PluginsProvider";
import { PropertyControllerContext } from "@home-assistant-react/providers/src/PropertyControllerProvider";
import { ThemeContext } from "@home-assistant-react/providers/src/ThemeProvider";

export const registerContexts = () => {
  const windowStore = getDashboardWindowStore();

  windowStore.registerContext("dashboard", DashboardContext);
  windowStore.registerContext("theme", ThemeContext);
  windowStore.registerContext("hass", HassContext);
  windowStore.registerContext("locale", LocaleContext);
  windowStore.registerContext("panel", PanelContext);
  windowStore.registerContext("panel-editor", PanelEditorContext);
  windowStore.registerContext("dashboard-editor", DashboardEditorContext);
  windowStore.registerContext("property-controller", PropertyControllerContext);
  windowStore.registerContext("style-editor", StyleEditorContext);
  windowStore.registerContext("api", ApiContext);
  windowStore.registerContext("plugins", PluginsContext);
};
