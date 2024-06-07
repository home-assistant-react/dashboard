import { useApi } from "@home-assistant-react/api/src";
import { PluginInfo } from "@home-assistant-react/types/src/providers/plugins-state";

export const useGetPluginImageUrl = () => {
  const api = useApi();
  return (plugin: PluginInfo) =>
    api.getUrl("/plugins/" + plugin.id + "/preview");
};
