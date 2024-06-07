import React from "react";
import { NumberInput } from "../../../form/NumberInput";
import { useStyleEditor } from "@home-assistant-react/api/src";
import { Flex } from "../../../primitives/common";

export const StylePadding = React.forwardRef<HTMLDivElement>((_, ref) => {
  const styleEditor = useStyleEditor();
  return (
    <>
      <Flex ref={ref} className={"gap-6"}>
        <NumberInput
          label={"Padding top"}
          value={String(styleEditor.style?.paddingTop || "")}
          onChange={(e) => {
            styleEditor.updateStyle("paddingTop", e.target.value);
          }}
        />

        <NumberInput
          label={"Padding right"}
          value={String(styleEditor.style?.paddingRight || "")}
          onChange={(e) => {
            styleEditor.updateStyle("paddingRight", e.target.value);
          }}
        />
      </Flex>
      <Flex ref={ref} className={"gap-6"}>
        <NumberInput
          label={"Padding bottom"}
          value={String(styleEditor.style?.paddingBottom || "")}
          onChange={(e) => {
            styleEditor.updateStyle("paddingBottom", e.target.value);
          }}
        />

        <NumberInput
          label={"Padding left"}
          value={String(styleEditor.style?.paddingLeft || "")}
          onChange={(e) => {
            styleEditor.updateStyle("paddingLeft", e.target.value);
          }}
        />
      </Flex>
    </>
  );
});

StylePadding.displayName = "StyleBorder";
