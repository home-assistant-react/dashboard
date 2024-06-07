import { getShadowFromDashboardStyle } from "@home-assistant-react/helpers/src/css/getShadowFromDashboardStyle";
import React from "react";
import { Button, ColorPickerInput } from "../../../components";
import { FormControlWrapper } from "../../../form/FormControlWrapper";
import { SwitchInput } from "../../../form/SwitchInput";
import { Slider } from "../../../primitives/Slider";
import { useStyleEditor } from "@home-assistant-react/api/src";
import { Box, Flex } from "../../../primitives/common";

export const StyleShadow = React.forwardRef<HTMLDivElement>((_, ref) => {
  const styleEditor = useStyleEditor();

  const handleResetShadow = () => {
    styleEditor.updateStyle("shadowColor", undefined);
    styleEditor.updateStyle("shadowInset", undefined);
    styleEditor.updateStyle("shadowShiftRight", undefined);
    styleEditor.updateStyle("shadowShiftDown", undefined);
    styleEditor.updateStyle("shadowBlur", undefined);
    styleEditor.updateStyle("shadowSpread", undefined);
    styleEditor.updateStyle("shadowOpacity", undefined);
    styleEditor.updateStyle("noShadow", undefined);
  };

  // TODO: disable shadow controls if no shadow is enabled
  //const isShadowDisabled = styleEditor.style?.noShadow;

  return (
    <Flex className={"flex-col gap-6"} ref={ref}>
      <Flex className={"gap-6"}>
        <ColorPickerInput
          label={"Shadow color"}
          color={styleEditor.style?.shadowColor}
          onChange={(color) => {
            styleEditor.updateStyle("shadowColor", color);
          }}
        />
        <SwitchInput
          label={"No shadow"}
          value={styleEditor.style?.noShadow}
          onChangeValue={(value) => styleEditor.updateStyle("noShadow", value)}
        />
        <SwitchInput
          label={"Inset"}
          value={styleEditor.style?.shadowInset}
          onChangeValue={(value) =>
            styleEditor.updateStyle("shadowInset", value)
          }
        />
        <Box>
          <Box
            className={"h-20 w-20 bg-muted rounded"}
            style={{
              boxShadow: getShadowFromDashboardStyle(styleEditor.style),
            }}
          />
        </Box>
      </Flex>
      <Flex className={"gap-6"}>
        <FormControlWrapper variant={"unstyled"} label={"Shift right"}>
          <Slider
            min={-50}
            max={50}
            value={[styleEditor.style?.shadowShiftRight || 0]}
            onValueChange={(values) => {
              styleEditor.updateStyle("shadowShiftRight", values[0]);
            }}
          />
        </FormControlWrapper>
        <FormControlWrapper variant={"unstyled"} label={"Shift down"}>
          <Slider
            min={-50}
            max={50}
            value={[styleEditor.style?.shadowShiftDown || 0]}
            onValueChange={(values) => {
              styleEditor.updateStyle("shadowShiftDown", values[0]);
            }}
          />
        </FormControlWrapper>
      </Flex>
      <Flex className={"gap-6"}>
        <FormControlWrapper variant={"unstyled"} label={"Blur"}>
          <Slider
            min={-50}
            max={50}
            value={[styleEditor.style?.shadowBlur || 0]}
            onValueChange={(values) => {
              styleEditor.updateStyle("shadowBlur", values[0]);
            }}
          />
        </FormControlWrapper>
        <FormControlWrapper variant={"unstyled"} label={"Spread"}>
          <Slider
            min={-50}
            max={50}
            value={[styleEditor.style?.shadowSpread || 0]}
            onValueChange={(values) => {
              styleEditor.updateStyle("shadowSpread", values[0]);
            }}
          />
        </FormControlWrapper>
        <FormControlWrapper variant={"unstyled"} label={"Opacity"}>
          <Slider
            min={-50}
            max={50}
            value={[styleEditor.style?.shadowOpacity || 0]}
            onValueChange={(values) => {
              styleEditor.updateStyle("shadowOpacity", values[0]);
            }}
          />
        </FormControlWrapper>
      </Flex>
      <Flex className={"gap-6"}>
        <Button variant={"secondary"} onClick={handleResetShadow}>
          Reset default shadow
        </Button>
      </Flex>
    </Flex>
  );
});

StyleShadow.displayName = "StyleShadow";
