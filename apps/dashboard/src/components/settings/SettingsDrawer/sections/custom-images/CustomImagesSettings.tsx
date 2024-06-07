import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import React from "react";
import {
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
import { CustomImageItem } from "./CustomImageItem";

export const CustomImagesSettings: React.FC = () => {
  const api = useApi();
  const toastSuccess = useToastSuccess();
  const { customImages: images, reloadCustomImages } = useHass();
  const [searchValue, setSearchValue] = React.useState<string | undefined>();
  const isUploadOpen = useBooleanValue();
  const deleteDisclosure = useDisclosure<{ imageId: string }>();
  const { wrapApiRequest } = useStandardApiHandler();

  const imageGroups = React.useMemo(() => {
    let filteredImages = getObjectKeys(images || {});
    if (searchValue) {
      filteredImages = filteredImages.filter(
        (imageId) =>
          imageId.includes(searchValue) ||
          images![imageId].image_name.includes(searchValue),
      );
    }
    return packIntoGroups(filteredImages, 4);
  }, [images, searchValue]);

  const handleDelete = wrapApiRequest(async (imageId?: string) => {
    if (!imageId) throw new Error("No image id provided");
    await api.deleteCustomImage(imageId);
    await reloadCustomImages();
    deleteDisclosure.close();
  }, "Image deleted");

  const handleRename = wrapApiRequest(
    async (imageId?: string, newName?: string) => {
      if (!imageId) throw new Error("No image id provided");
      if (!newName) throw new Error("No new name provided");
      await api.renameCustomImage(imageId, newName);
      await reloadCustomImages();
    },
  );

  return (
    <>
      <Flex className={"w-full h-full relative flex-col"}>
        <Flex className={"items-stretch gap-4 px-10"}>
          <DebouncedInput
            onChangeValue={setSearchValue}
            placeholder={"Search images"}
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
          items={imageGroups}
          itemHeight={240}
          renderItem={(imageId, groupIndex) => (
            <Grid
              style={{ width: "100%", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
              key={groupIndex}
            >
              {imageId.map((imageId) => (
                <CustomImageItem
                  key={imageId}
                  image={images![imageId]}
                  onDelete={() => deleteDisclosure.open({ imageId })}
                  onRename={handleRename}
                />
              ))}
            </Grid>
          )}
        />
        <DropZone
          supportedExtensions={["svg", "jpg", "jpeg", "png"]}
          supportedMimeTypes={["image/svg+xml", "image/jpeg", "image/png"]}
          fileMaxSize={30000000}
          simultaneousUploads={3}
          fileUploaderGetter={api.getCustomImageUploader.bind(api)}
          onFinish={(files) => {
            if (files.length === 0) return;

            toastSuccess(`${files.length} images uploaded`);
            reloadCustomImages();
          }}
          onOpenChange={isUploadOpen.setValue}
          isOpen={isUploadOpen.value}
          allowMultiple
          closeOnFinish
        />
      </Flex>
      <DeleteConfirmModal
        title={"Delete custom image"}
        message={
          <>
            Are you sure you want to delete this custom image?{" "}
            {deleteDisclosure?.data?.imageId &&
              !!images![deleteDisclosure?.data?.imageId] && (
                <Flex className={"justify-center p-10 w-full"}>IMAGE</Flex>
              )}
          </>
        }
        confirmLabel={"Delete image"}
        isOpen={deleteDisclosure.isOpen}
        onOpenChange={deleteDisclosure.onOpenChange}
        onConfirm={() => {
          handleDelete(deleteDisclosure.data?.imageId);
        }}
      />
    </>
  );
};
