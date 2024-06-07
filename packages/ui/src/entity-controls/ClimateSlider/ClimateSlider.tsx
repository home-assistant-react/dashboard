import React from "react";
import { ClimateSliderProps } from "./ClimateSlider.types";
import "./climate-slider.css";
import { ClimateSliderController } from "./ClimateSliderController";
import { ClimateSliderProvider } from "./ClimateSliderProvider";

export const ClimateSlider: React.FC<ClimateSliderProps> = (props) => {
  const { step = 1, min = 0, max = 100 } = props;

  return (
    <ClimateSliderProvider
      value={{
        ...props,
        step,
        min,
        max,
      }}
    >
      <ClimateSliderController />
    </ClimateSliderProvider>
  );
};
