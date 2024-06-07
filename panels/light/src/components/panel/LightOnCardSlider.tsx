import { lightBrightness } from "@home-assistant-react/helpers/src/home-assistant";
import { Box, ControlSlider } from "@home-assistant-react/ui/src";
import React from "react";
import { LightPanelGrid } from "./LightPanelGrid";
import { useLightPanel } from "../LightPanelProvider";

const classes = {
  SlideControl: "absolute inset-0",
};

export interface LightOnCardSliderProps {
  sliderControlWidth: number;
}

export const LightOnCardSlider: React.FC<LightOnCardSliderProps> = (props) => {
  const { sliderControlWidth } = props;
  const { light, hasBrightnessControl, hasSliderOnPanel, brightness } =
    useLightPanel();
  if (!hasBrightnessControl || !hasSliderOnPanel) return null;

  return (
    <Box
      className={classes.SlideControl}
      style={{
        right: sliderControlWidth,
      }}
    >
      <ControlSlider
        minHeight={"10px"}
        height={"100%"}
        thickness={sliderControlWidth}
        handleColor={"rgba(255,255,255,.2)"}
        roundness={0}
        value={brightness}
        onChangeFinal={async (values) => {
          await light.setBrightness(lightBrightness(values || 0));
        }}
        max={255}
        overlayContent={<LightPanelGrid isHalf />}
      />
    </Box>
  );
};
