import React from "react";
import { NumberInput } from "../../../form/NumberInput";
import { useStyleEditor } from "@home-assistant-react/api/src";
import { ColorPickerInput } from "../../../components";
import { Box, Flex } from "../../../primitives/common";

export const StyleBorder = React.forwardRef<HTMLDivElement>((_, ref) => {
  const styleEditor = useStyleEditor();
  return (
    <>
      <Flex ref={ref} className={"gap-6"}>
        <Box style={{ width: "40%" }}>
          <ColorPickerInput
            label={"Border color"}
            color={styleEditor.style?.borderColor}
            onChange={(color) => {
              styleEditor.updateStyle("borderColor", color);
            }}
          />
        </Box>
        <NumberInput
          label={"Border width"}
          value={String(styleEditor.style?.borderWidth || "")}
          onChange={(e) => {
            styleEditor.updateStyle("borderWidth", e.target.value);
          }}
        />
      </Flex>
      <Flex ref={ref} className={"gap-6"}>
        <NumberInput
          label={"Border top left radius"}
          value={String(styleEditor.style?.borderTopLeftRadius || "")}
          onChange={(e) => {
            styleEditor.updateStyle("borderTopLeftRadius", e.target.value);
          }}
        />

        <NumberInput
          label={"Border top right radius"}
          value={String(styleEditor.style?.borderTopRightRadius || "")}
          onChange={(e) => {
            styleEditor.updateStyle("borderTopRightRadius", e.target.value);
          }}
        />
      </Flex>
      <Flex ref={ref} className={"gap-6"}>
        <NumberInput
          label={"Border bottom left radius"}
          value={String(styleEditor.style?.borderBottomLeftRadius || "")}
          onChange={(e) => {
            styleEditor.updateStyle("borderBottomLeftRadius", e.target.value);
          }}
        />

        <NumberInput
          label={"Border bottom right radius"}
          value={String(styleEditor.style?.borderBottomRightRadius || "")}
          onChange={(e) => {
            styleEditor.updateStyle("borderBottomRightRadius", e.target.value);
          }}
        />
      </Flex>
    </>
  );
});

StyleBorder.displayName = "StyleBorder";
