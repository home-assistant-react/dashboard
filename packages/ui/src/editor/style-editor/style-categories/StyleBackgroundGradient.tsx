import React from "react";
import { Flex } from "../../../primitives/common";
import { GradientEditorInput } from "../../../components";
import { useStyleEditor } from "@home-assistant-react/api/src";

const classes = {
  Wrapper: "gap-6 flex-col",
};

export const StyleBackgroundGradient = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const styleEditor = useStyleEditor();

    return (
      <Flex className={classes.Wrapper} ref={ref}>
        <GradientEditorInput
          label={"Background gradient"}
          value={styleEditor.style?.backgroundGradient || ""}
          onChange={(value) =>
            styleEditor.updateStyle("backgroundGradient", value)
          }
        />
      </Flex>
    );
  },
);

StyleBackgroundGradient.displayName = "StyleBackgroundGradient";
