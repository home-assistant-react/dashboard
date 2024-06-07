import { usePlugins } from "@home-assistant-react/api/src/hooks/providers/usePlugins";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import { ConfirmModal } from "@home-assistant-react/ui/src/components/modals/ConfirmModal";
import React from "react";
import {
  DebouncedInput,
  DeleteConfirmModal,
  useToastError,
  useToastSuccess,
  VirtualizedList,
} from "@home-assistant-react/ui/src";
import {
  getObjectKeys,
  packIntoGroups,
} from "@home-assistant-react/helpers/src";
import { Flex, Grid, Button } from "@home-assistant-react/ui/src";
import { DropZone } from "@home-assistant-react/ui/src/components/controls/DropZone";
import { useApi } from "@home-assistant-react/api/src";
import {
  useBooleanValue,
  useDisclosure,
} from "@home-assistant-react/hooks/src";
import { PluginItem } from "./PluginItem";

export const PluginsSettings: React.FC = () => {
  const api = useApi();

  const { loadedPlugins: plugins, reloadPlugins } = usePlugins();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const [searchValue, setSearchValue] = React.useState<string | undefined>();
  const isUploadOpen = useBooleanValue();
  const uninstallDisclosure = useDisclosure<{ pluginId: string }>();
  const disableDisclosure = useDisclosure<{ pluginId: string }>();
  const enableDisclosure = useDisclosure<{ pluginId: string }>();
  const { wrapApiRequest } = useStandardApiHandler();

  const pluginsGroups = React.useMemo(() => {
    let filteredPlugins = getObjectKeys(plugins || {});
    if (searchValue) {
      filteredPlugins = filteredPlugins.filter(
        (pluginId) =>
          pluginId.includes(searchValue) ||
          plugins![pluginId].name.includes(searchValue),
      );
    }
    return packIntoGroups(filteredPlugins, 4);
  }, [plugins, searchValue]);

  const handleUninstall = wrapApiRequest(async (pluginId?: string) => {
    if (!pluginId) throw new Error("No plugin id provided");
    await api.uninstallPlugin(pluginId);
    await reloadPlugins();
    uninstallDisclosure.close();
  }, "Plugin uninstalled");

  const handleDisable = wrapApiRequest(async (pluginId?: string) => {
    if (!pluginId) throw new Error("No plugin id provided");
    await api.disablePlugin(pluginId);
    await reloadPlugins();
    disableDisclosure.close();
  });

  const handleEnable = wrapApiRequest(async (pluginId?: string) => {
    if (!pluginId) throw new Error("No plugin id provided");
    await api.enablePlugin(pluginId);
    await reloadPlugins();
    enableDisclosure.close();
  });

  return (
    <>
      <Flex className={"w-full h-full relative flex-col"}>
        <Flex className={"items-stretch gap-4 px-10"}>
          <DebouncedInput
            onChangeValue={setSearchValue}
            placeholder={"Search plugins"}
            delay={100}
            isClearable
          />
          <Button
            onClick={isUploadOpen.setTrue}
            icon={"Upload"}
            className={"h-auto"}
          >
            Upload
          </Button>
        </Flex>
        <VirtualizedList
          padding={32}
          items={pluginsGroups}
          itemHeight={240}
          renderItem={(pluginKeys, groupIndex) => (
            <Grid
              style={{ width: "100%", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
              key={groupIndex}
            >
              {pluginKeys.map((pluginId) => (
                <PluginItem
                  key={pluginId}
                  plugin={plugins[pluginId]}
                  onUninstall={() => {
                    uninstallDisclosure.open({ pluginId });
                  }}
                  onDisable={() => {
                    disableDisclosure.open({ pluginId });
                  }}
                  onEnable={() => {
                    enableDisclosure.open({ pluginId });
                  }}
                />
              ))}
            </Grid>
          )}
        />
        <DropZone
          supportedExtensions={["zip"]}
          supportedMimeTypes={["application/zip"]}
          fileMaxSize={30000000}
          simultaneousUploads={3}
          fileUploaderGetter={api.getPluginUploader.bind(api)}
          onFinish={(files) => {
            if (files.length === 0) return;

            toastSuccess("Plugin uploaded successfully");
            reloadPlugins();
          }}
          onErrors={(errors) => {
            errors.forEach((error) => {
              toastError(error);
            });
          }}
          onOpenChange={isUploadOpen.setValue}
          isOpen={isUploadOpen.value}
          allowMultiple={false}
          closeOnFinish
        />
      </Flex>
      <DeleteConfirmModal
        title={"Uninstall plugin"}
        message={<>Are you sure you want to uninstall this plugin?</>}
        confirmLabel={"Uninstall plugin"}
        isOpen={uninstallDisclosure.isOpen}
        onOpenChange={uninstallDisclosure.onOpenChange}
        onConfirm={() => {
          handleUninstall(uninstallDisclosure.data?.pluginId);
        }}
        confirmText={"UNINSTALL PLUGIN"}
      />
      <ConfirmModal
        title={"Disable plugin"}
        message={<>Are you sure you want to disable this plugin?</>}
        confirmLabel={"Disable plugin"}
        isOpen={disableDisclosure.isOpen}
        onOpenChange={disableDisclosure.onOpenChange}
        onConfirm={() => {
          handleDisable(disableDisclosure.data?.pluginId);
        }}
      />
      <ConfirmModal
        title={"Enable plugin"}
        message={<>Are you sure you want to enable this plugin?</>}
        confirmLabel={"Enable plugin"}
        isOpen={enableDisclosure.isOpen}
        onOpenChange={enableDisclosure.onOpenChange}
        onConfirm={() => {
          handleEnable(enableDisclosure.data?.pluginId);
        }}
      />
    </>
  );
};
