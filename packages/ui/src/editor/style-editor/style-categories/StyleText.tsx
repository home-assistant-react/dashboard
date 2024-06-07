import React from "react";
import { NumberInput } from "../../../form/NumberInput";
import { useStyleEditor } from "@home-assistant-react/api/src";
import { Box, Flex, Grid } from "../../../primitives/common";
import { ColorPickerInput } from "../../../components";

export const StyleText = React.forwardRef<HTMLDivElement>((_, ref) => {
  const styleEditor = useStyleEditor();

  return (
    <Flex ref={ref} className={"gap-6 flex-col"}>
      <Grid className={"w-full gap-6 grid-cols-2"}>
        <Box>
          <ColorPickerInput
            label={"Text/Icon color"}
            color={styleEditor.style?.color}
            onChange={(color) => {
              styleEditor.updateStyle("color", color);
            }}
          />
        </Box>
        <Box>
          <NumberInput
            label={"Font size"}
            value={styleEditor.style?.fontSize}
            onChange={(e) => {
              styleEditor.updateStyle("fontSize", e.target.value);
            }}
          />
        </Box>
      </Grid>
    </Flex>
  );
});

StyleText.displayName = "StyleText";
