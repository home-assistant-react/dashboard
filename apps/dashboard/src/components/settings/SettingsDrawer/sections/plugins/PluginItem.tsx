import { useGetPluginImageUrl } from "@home-assistant-react/hooks/src/useGetPluginImageUrl";
import { PluginInfo } from "@home-assistant-react/types/src/providers/plugins-state";
import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
} from "@home-assistant-react/ui/src";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";

export const PluginItem = ({
  plugin,
  onDisable,
  onUninstall,
  onEnable,
}: {
  plugin: PluginInfo;
  onUninstall: (pluginId: string) => void;
  onDisable: (pluginId: string) => void;
  onEnable: (pluginId: string) => void;
}) => {
  const getImageUrl = useGetPluginImageUrl();
  return (
    <Box
      className={[
        "p-5 gap-3 rounded overflow-hidden items-center justify-between h-[240px] flex-col hover:bg-accent hover:cursor-pointer",
      ]}
      data-plugin-id={plugin.name}
    >
      <Flex
        className={[
          "relative bg-no-repeat bg-cover bg-center border rounded-md overflow-hidden w-full h-full",
          plugin.disabled && "opacity-20 hover:opacity-100",
        ]}
        style={{ backgroundImage: `url('${getImageUrl(plugin)}')` }}
      >
        <Flex
          className={
            "absolute left-0 right-0 bottom-0 bg-muted/60 backdrop-blur-md border-t items-center text-xs py-1 pr-1"
          }
        >
          <Box
            className={
              "w-full text-center whitespace-nowrap text-ellipsis flex-grow overflow-hidden pl-2 text-left"
            }
          >
            {plugin.name}
          </Box>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Icon name={"EllipsisVertical"} size={4} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {plugin.disabled && (
                <DropdownMenuItem
                  onClick={() => {
                    onEnable(plugin.id);
                  }}
                >
                  Enable plugin
                </DropdownMenuItem>
              )}
              {!plugin.disabled && (
                <DropdownMenuItem
                  onClick={() => {
                    onDisable(plugin.id);
                  }}
                >
                  Disable plugin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onUninstall(plugin.id);
                }}
              >
                Uninstall plugin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>
    </Box>
  );
};
