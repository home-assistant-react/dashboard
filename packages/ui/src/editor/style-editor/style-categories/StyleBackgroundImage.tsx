import React from "react";
import { ImagePickerInput } from "../../../components/controls/ImagePickerInput";

import { SelectInput } from "../../../form/SelectInput";
import { TextInput } from "../../../form/TextInput";
import { useStyleEditor } from "@home-assistant-react/api/src";
import { Box, Flex, Grid } from "../../../primitives/common";
import { SelectItem, SelectSeparator } from "../../../components";
import { BackgroundImageType } from "@home-assistant-react/types/src";

const classes = {
  Wrapper: "gap-6 flex-col",
};

export const StyleBackgroundImage = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    const styleEditor = useStyleEditor();

    return (
      <Flex className={classes.Wrapper} ref={ref}>
        <Flex className={"w-full gap-6"}>
          <TextInput
            value={styleEditor?.style?.backgroundImageValue}
            onChange={(event) => {
              styleEditor.updateStyle(
                "backgroundImageValue",
                event?.target?.value,
              );
              styleEditor.updateStyle(
                "backgroundImageType",
                BackgroundImageType.Url,
              );
            }}
            label={"External image (URL)"}
            placeholder={"https://example.com/image.jpg"}
          />
        </Flex>
        <Box className={"w-full gap-6"}>
          <ImagePickerInput
            value={styleEditor?.style?.customBackgroundImage}
            onChange={(imageValue) => {
              styleEditor.updateStyle("customBackgroundImage", imageValue);
              styleEditor.updateStyle(
                "backgroundImageType",
                BackgroundImageType.Custom,
              );
            }}
            label={"Custom image"}
          />
        </Box>
        <Grid className={"w-full gap-6 grid-cols-2"}>
          <SelectInput
            label={"Position X"}
            value={String(styleEditor.style?.backgroundPositionX || "")}
            onChangeValue={(value) => {
              styleEditor.updateStyle("backgroundPositionX", value);
            }}
          >
            <SelectItem value={""}>Default</SelectItem>
            <SelectSeparator />
            <SelectItem value={"left"}>Left</SelectItem>
            <SelectItem value={"center"}>Center</SelectItem>
            <SelectItem value={"right"}>Right</SelectItem>
          </SelectInput>
          <SelectInput
            label={"Position Y"}
            value={String(styleEditor.style?.backgroundPositionY || "")}
            onChangeValue={(value) => {
              styleEditor.updateStyle("backgroundPositionY", value);
            }}
          >
            <SelectItem value={""}>Default</SelectItem>
            <SelectSeparator />
            <SelectItem value={"top"}>Top</SelectItem>
            <SelectItem value={"center"}>Center</SelectItem>
            <SelectItem value={"bottom"}>Bottom</SelectItem>
          </SelectInput>
        </Grid>
        <Flex className={"gap-6"}>
          <SelectInput
            label={"Image size"}
            value={String(styleEditor.style?.backgroundSize || "")}
            onChangeValue={(value) => {
              styleEditor.updateStyle("backgroundSize", value);
            }}
          >
            <SelectItem value={""}>Default</SelectItem>
            <SelectSeparator />
            <SelectItem value={"auto"}>Auto</SelectItem>
            <SelectItem value={"cover"}>Cover</SelectItem>
            <SelectItem value={"contain"}>Contain</SelectItem>
          </SelectInput>
          <SelectInput
            label={"Image repeat"}
            value={styleEditor.style?.backgroundRepeat || ""}
            onChangeValue={(value) => {
              styleEditor.updateStyle("backgroundRepeat", value);
            }}
          >
            <SelectItem value={""}>Default</SelectItem>
            <SelectSeparator />
            <SelectItem value={"no-repeat"}>No repeat</SelectItem>
            <SelectItem value={"repeat"}>Repeat</SelectItem>
            <SelectItem value={"repeat-x"}>Repeat X</SelectItem>
            <SelectItem value={"repeat-y"}>Repeat Y</SelectItem>
          </SelectInput>
        </Flex>
      </Flex>
    );
  },
);

StyleBackgroundImage.displayName = "StyleBackgroundImage";
