import { useApi } from "@home-assistant-react/api/src";
import { loadPanelComponent } from "@home-assistant-react/api/src/dashboard";
import { getObjectKeys, logError } from "@home-assistant-react/helpers/src";
import {
  PluginInfo,
  PluginsState,
} from "@home-assistant-react/types/src/providers/plugins-state";
import React from "react";
import { PluginsProviderProps } from "./PluginsProvider.types";

export const PluginsContext = React.createContext<PluginsState | null>(null);

export const PluginsProvider: React.FC<PluginsProviderProps> = ({
  children,
}) => {
  const [loadedPlugins, setLoadedPlugins] = React.useState<
    Record<string, PluginInfo>
  >({});
  const api = useApi();

  const reloadPlugins = async () => {
    const plugins = await api.getPlugins();
    const baseUrl = api.getBaseUrl();
    getObjectKeys(plugins.plugins || {}).forEach((pluginName) => {
      if (plugins.plugins[pluginName].disabled) return;
      try {
        loadPanelComponent(`${baseUrl}/plugins/${pluginName}/plugin.js`);
      } catch (err) {
        logError("Error loading plugin", err, "plugins-provider");
      }
    });
    setLoadedPlugins(plugins.plugins || {});
  };

  React.useEffect(() => {
    reloadPlugins().then();
  }, []);

  return (
    <PluginsContext.Provider value={{ loadedPlugins, reloadPlugins }}>
      {children}
    </PluginsContext.Provider>
  );
};

PluginsProvider.displayName = "PluginsProvider";
