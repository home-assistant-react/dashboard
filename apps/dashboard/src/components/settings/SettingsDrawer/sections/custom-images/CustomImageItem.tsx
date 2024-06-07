import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { useGetCustomImageThumbnailUrl } from "@home-assistant-react/hooks/src/useGetCustomImageThumbnailUrl";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { CustomImage } from "@home-assistant-react/types/src/ui/custom-images";
import { Box, Button, Flex } from "@home-assistant-react/ui/src";
import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import { TextInput } from "@home-assistant-react/ui/src/form/TextInput";
import React from "react";

export const CustomImageItem = ({
  image,
  onDelete,
  onRename,
}: {
  image: CustomImage;
  onDelete: (imageId: string) => void;
  onRename: (imageId: string, newName: string) => void;
}) => {
  const getThumbnailUrl = useGetCustomImageThumbnailUrl();
  const isEditOpen = useBooleanValue();
  const [inputName, setInputName] = React.useState(image.image_name);
  return (
    <Box
      className={[
        "group p-5 gap-3 rounded overflow-hidden items-center justify-center h-[240px] flex-col hover:bg-accent hover:cursor-pointer",
      ]}
      data-image-id={image.id}
    >
      <Flex
        className={[
          "relative bg-no-repeat bg-cover bg-center border rounded-md overflow-hidden w-full h-full",
        ]}
        style={{ backgroundImage: `url('${getThumbnailUrl(image)}')` }}
      >
        <Flex
          className={
            "absolute left-0 right-0 bottom-0 bg-muted/60 backdrop-blur-md border-t items-center text-xs py-1 pr-1"
          }
        >
          {!isEditOpen.value && (
            <Box
              className={
                "w-full text-center whitespace-nowrap text-ellipsis flex-grow overflow-hidden pl-2 text-left"
              }
              onClick={isEditOpen.setTrue}
            >
              {image.image_name}
            </Box>
          )}
          {!isEditOpen.value ? (
            <Button
              variant={"ghost"}
              onClick={onDelete.bind(null, image.id)}
              className={"opacity-0 group-hover:opacity-100"}
            >
              {getMdiIcon("trashCan")}
            </Button>
          ) : (
            <FormWrapper>
              <Flex className={"gap-1 items-stretch"}>
                <TextInput
                  value={inputName}
                  onChange={(e) => setInputName(e.currentTarget.value)}
                  hideEmptyMessages
                />
                <FormSubmit
                  className={"h-auto"}
                  variant={"destructive"}
                  icon={"Check"}
                  onClick={() => {
                    onRename(image.id, inputName);
                    isEditOpen.setFalse();
                  }}
                />
                <Button
                  variant={"outline"}
                  className={"h-auto"}
                  icon={"X"}
                  onClick={isEditOpen.setFalse}
                />
              </Flex>
            </FormWrapper>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
