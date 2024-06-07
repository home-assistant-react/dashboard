export interface PluginInfo {
  name: string;
  description: string;
  version: string;
  url: string;
  main: string;
  id: string;
  disabled: boolean;
}

export interface PluginsState {
  loadedPlugins: Record<string, PluginInfo>;
  reloadPlugins: () => Promise<void>;
}
