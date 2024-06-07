import React from "react";
import { Flex } from "../../../primitives/common";
import { ColorPickerInput } from "../../../components";
import { useStyleEditor } from "@home-assistant-react/api/src";

const classes = {
  Wrapper: "gap-6",
};

export const StyleFillAndStroke = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const styleEditor = useStyleEditor();

    return (
      <Flex className={classes.Wrapper} ref={ref}>
        <ColorPickerInput
          label={"Fill"}
          color={styleEditor.style?.fill}
          onChange={(color) => {
            styleEditor.updateStyle("fill", color);
          }}
        />
        <ColorPickerInput
          label={"Stroke"}
          color={styleEditor.style?.stroke}
          onChange={(color) => {
            styleEditor.updateStyle("stroke", color);
          }}
        />
      </Flex>
    );
  },
);

StyleFillAndStroke.displayName = "StyleFillAndStroke";
