import React from "react";
import { LightBrightnessSliderProps } from "./LightBrightnessSlider.types";
import { lightBrightness } from "@home-assistant-react/helpers/src/home-assistant";
import { ControlSlider, ControlSliderDirection } from "../../components";
import { useLightServices } from "@home-assistant-react/api/src/services/light";

export const LightBrightnessSlider = React.forwardRef<
  HTMLDivElement,
  LightBrightnessSliderProps
>((props, ref) => {
  const { entity, ...rest } = props;
  const light = useLightServices(entity);
  return (
    <ControlSlider
      ref={ref}
      max={255}
      minHandlePercent={1}
      value={entity?.attributes.brightness || 0}
      onChangeFinal={async (values) => {
        await light.setBrightness(lightBrightness(values || 0));
      }}
      backgroundColor={"#ffc107"}
      fillColor={"#ffc107"}
      direction={ControlSliderDirection.Up}
      {...rest}
    />
  );
});

LightBrightnessSlider.displayName = "LightBrightnessSlider";
