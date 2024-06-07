import React from "react";
import { Flex } from "../../../primitives/common";
import { ColorPickerInput } from "../../../components";
import { useStyleEditor } from "@home-assistant-react/api/src";

const classes = {
  Wrapper: "gap-6 flex-col",
};

export const StyleBackgroundColor = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const styleEditor = useStyleEditor();

    return (
      <Flex className={classes.Wrapper} ref={ref}>
        <ColorPickerInput
          label={"Background color"}
          color={styleEditor.style?.backgroundColor}
          onChange={(color) => {
            styleEditor.updateStyle("backgroundColor", color);
          }}
        />
      </Flex>
    );
  },
);

StyleBackgroundColor.displayName = "StyleBackgroundColor";
