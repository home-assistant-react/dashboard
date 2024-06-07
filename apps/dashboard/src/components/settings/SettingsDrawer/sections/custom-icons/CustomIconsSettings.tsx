import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import React from "react";
import {
  CustomSvgIcon,
  DebouncedInput,
  DeleteConfirmModal,
  useToastSuccess,
  VirtualizedList,
} from "@home-assistant-react/ui/src";
import {
  getObjectKeys,
  packIntoGroups,
} from "@home-assistant-react/helpers/src";
import { Flex, Grid, Button } from "@home-assistant-react/ui/src";
import { DropZone } from "@home-assistant-react/ui/src/components/controls/DropZone";
import { useApi, useHass } from "@home-assistant-react/api/src";
import {
  useBooleanValue,
  useDisclosure,
} from "@home-assistant-react/hooks/src";
import { CustomIconItem } from "./CustomIconItem";

const classes = {
  Wrapper: "w-full h-full relative flex-col",
};

export const CustomIconsSettings: React.FC = () => {
  const api = useApi();
  const toastSuccess = useToastSuccess();
  const { customIcons: icons, reloadCustomIcons } = useHass();
  const [searchValue, setSearchValue] = React.useState<string | undefined>();
  const isUploadOpen = useBooleanValue();
  const deleteDisclosure = useDisclosure<{ iconId: string }>();
  const { wrapApiRequest } = useStandardApiHandler();

  const iconGroups = React.useMemo(() => {
    let filteredIcons = getObjectKeys(icons || {});
    if (searchValue) {
      filteredIcons = filteredIcons.filter(
        (iconId) =>
          iconId.includes(searchValue) ||
          icons![iconId].icon_name.includes(searchValue),
      );
    }
    return packIntoGroups(filteredIcons, 4);
  }, [icons, searchValue]);

  const handleDelete = wrapApiRequest(async (iconId?: string) => {
    if (!iconId) throw new Error("No icon id provided");
    await api.deleteCustomIcon(iconId);
    await reloadCustomIcons();
    deleteDisclosure.close();
  }, "Icon deleted");

  const handleRename = wrapApiRequest(
    async (iconId?: string, newName?: string) => {
      if (!iconId) throw new Error("No icon id provided");
      if (!newName) throw new Error("No new name provided");
      await api.renameCustomIcon(iconId, newName);
      await reloadCustomIcons();
    },
  );

  return (
    <>
      <Flex className={classes.Wrapper}>
        <Flex className={"items-stretch gap-4 px-10"}>
          <DebouncedInput
            onChangeValue={setSearchValue}
            placeholder={"Search icons"}
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
          items={iconGroups}
          itemHeight={72}
          renderItem={(iconId, groupIndex) => (
            <Grid
              style={{ width: "100%", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
              key={groupIndex}
            >
              {iconId.map((iconId) => (
                <CustomIconItem
                  key={iconId}
                  icon={icons![iconId]}
                  onDelete={() => deleteDisclosure.open({ iconId })}
                  onRename={handleRename}
                />
              ))}
            </Grid>
          )}
        />
        <DropZone
          supportedExtensions={["svg"]}
          supportedMimeTypes={["image/svg+xml"]}
          fileMaxSize={30000000}
          simultaneousUploads={3}
          fileUploaderGetter={api.getCustomIconUploader.bind(api)}
          onFinish={(files) => {
            if (files.length === 0) return;
            toastSuccess(`${files.length} icons uploaded`);
            reloadCustomIcons();
          }}
          onOpenChange={isUploadOpen.setValue}
          isOpen={isUploadOpen.value}
          allowMultiple
          closeOnFinish
        />
      </Flex>
      <DeleteConfirmModal
        title={"Delete custom icon"}
        message={
          <>
            Are you sure you want to delete this custom icon?{" "}
            {deleteDisclosure?.data?.iconId &&
              !!icons![deleteDisclosure?.data?.iconId] && (
                <Flex className={"justify-center p-10 w-full"}>
                  <CustomSvgIcon
                    icon={icons![deleteDisclosure?.data?.iconId]}
                    width={64}
                    height={64}
                  />
                </Flex>
              )}
          </>
        }
        confirmLabel={"Delete icon"}
        isOpen={deleteDisclosure.isOpen}
        onOpenChange={deleteDisclosure.onOpenChange}
        onConfirm={() => {
          handleDelete(deleteDisclosure.data?.iconId);
        }}
      />
    </>
  );
};
