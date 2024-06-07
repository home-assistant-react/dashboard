import { useGetCustomImageThumbnailUrlById } from "@home-assistant-react/hooks/src/useGetCustomImageThumbnailUrlById";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import React from "react";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { ImageValue } from "../ImagePicker/ImagePicker.types";
import { ImagePickerInputProps } from "./ImagePickerInput.types";
import { FormControlWrapper } from "../../form";
import { Box, Flex } from "../../../primitives/common";
import { Button } from "../../buttons";

const classes = {
  PreviewBox: "h-32 w-full items-center justify-center border-1",
  PreviewBoxNoValue: "bg-muted",
  PopoverContent: "bg-primary-background p-0 w-[550px]",
  PopoverArrow: "fill-muted",
};

export const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  value: userValue,
  onChange,
  isClearable = true,
  ...rest
}) => {
  const getThumbnailUrl = useGetCustomImageThumbnailUrlById();
  const [value, setValue] = React.useState<ImageValue | undefined>();
  const isOpen = useBooleanValue();
  const handleSelectImage = (image: ImageValue) => {
    setValue(image);
    onChange?.(image);
    isOpen.setFalse();
  };

  const handleClear = () => {
    setValue(undefined);
    onChange?.(undefined);
  };

  const imageValue = userValue || value;

  return (
    <FormControlWrapper {...rest}>
      <Popover open={isOpen.value} onOpenChange={isOpen.setValue}>
        <PopoverTrigger asChild>
          <Box className={"w-full"}>
            <Flex
              className={[
                classes.PreviewBox,
                !imageValue ? classes.PreviewBoxNoValue : undefined,
              ]}
            >
              {!imageValue && getMdiIcon("circleOffOutline", { size: 0.8 })}
              {imageValue && <img src={getThumbnailUrl(imageValue.image)} />}
            </Flex>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          arrowProps={{ className: classes.PopoverArrow }}
          className={classes.PopoverContent}
        >
          <ImagePicker
            onSelect={handleSelectImage}
            initialImageSet={"custom"}
          />
        </PopoverContent>
      </Popover>
      {isClearable && imageValue && (
        <Button variant={"ghost"} onClick={handleClear}>
          {getMdiIcon("close", { size: 0.8 })}
        </Button>
      )}
    </FormControlWrapper>
  );
};
