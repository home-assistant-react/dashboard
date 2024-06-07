import { useGetCustomImageThumbnailUrl } from "@home-assistant-react/hooks/src/useGetCustomImageThumbnailUrl";
import React from "react";
import { Box, Flex } from "../../../primitives/common";
import { OverlayButton } from "../../buttons";
import { ImagePickerImageButtonProps } from "./ImagePicker.types";

const classes = {
  ImageButton:
    "gap-2 pl-2 py-4 grid-cols-1 hover:cursor-pointer hover:bg-accent",
  ImageName: "text-xs w-full pt-2 break-words",
};

export const ImagePickerImageButton: React.FC<ImagePickerImageButtonProps> = ({
  image,
  onClick,
}) => {
  const getThumbnailUrl = useGetCustomImageThumbnailUrl();

  return (
    <OverlayButton className={classes.ImageButton} onClick={onClick}>
      <Flex
        className={
          "overflow-hidden w-1/2 h-full justify-center border-r border-muted bg-muted "
        }
      >
        <img src={getThumbnailUrl(image)} alt={image.image_name} />
      </Flex>
      <Box className={classes.ImageName}>{image.image_name}</Box>
    </OverlayButton>
  );
};
