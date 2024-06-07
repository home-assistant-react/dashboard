import React from "react";
import { LightColorTemperatureSliderProps } from "./LightColorTemperatureSlider.types";
import { useLightServices } from "@home-assistant-react/api/src/services/light";
import { ControlSlider, ControlSliderDirection } from "../../components";

export const LightColorTemperatureSlider = React.forwardRef<
  HTMLDivElement,
  LightColorTemperatureSliderProps
>((props, ref) => {
  const { entity, ...rest } = props;
  const light = useLightServices(entity);

  return (
    <ControlSlider
      ref={ref}
      min={entity?.attributes.min_color_temp_kelvin || 0}
      max={entity?.attributes.max_color_temp_kelvin || 0}
      minHandlePercent={1}
      value={entity?.attributes?.color_temp_kelvin}
      onChangeFinal={async (value) => {
        await light.setTemperatureKelvin(value);
      }}
      handleSize={8}
      backgroundColor={
        "-webkit-linear-gradient(top, #ff5600 0%, #ff7a00 10%, #ff952e 20%, #ffaa5e 30.000000000000004%, #ffbb82 40%, #ffca9f 50%, #ffd7b6 60.00000000000001%, #ffe2cb 70%, #ffecdc 80%, #fff6ec 90%, #fffefa 100%)"
      }
      opacity={1}
      fillColor={"rgba(0,0,0,.5)"}
      direction={ControlSliderDirection.Down}
      {...rest}
    />
  );
});

LightColorTemperatureSlider.displayName = "LightColorTemperatureSlider";
