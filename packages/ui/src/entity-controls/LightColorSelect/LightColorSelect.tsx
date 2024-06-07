import React from "react";
import { LightColorSelectProps } from "./LightColorSelect.types";
import { ColorWheel } from "../../components";
import { useLightServices } from "@home-assistant-react/api/src/services/light";
import { getLightCurrentModeRgbColor } from "@home-assistant-react/helpers/src/home-assistant/entities/light";
import { rgb2hs } from "@home-assistant-react/helpers/src";

export const LightColorSelect = React.forwardRef<
  HTMLDivElement,
  LightColorSelectProps
>((props, ref) => {
  const { entity, ...rest } = props;
  const light = useLightServices(entity);
  const currentRgbColor = getLightCurrentModeRgbColor(entity);
  const currentColor = currentRgbColor
    ? rgb2hs(currentRgbColor.slice(0, 3) as [number, number, number])
    : undefined;
  const brightness = currentRgbColor
    ? Math.round((Math.max(...currentRgbColor.slice(0, 3)) * 100) / 255)
    : undefined;
  let brightnessAdjusted: number | undefined;
  return (
    <ColorWheel
      ref={ref}
      size={300}
      selectedColor={currentColor}
      brightness={brightness}
      onChangeFinal={async (color) => {
        await light.setColor(entity, color, brightness, brightnessAdjusted);
      }}
      {...rest}
    />
  );
});

LightColorSelect.displayName = "LightColorSelect";
