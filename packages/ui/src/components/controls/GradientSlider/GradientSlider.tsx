import React from "react";
import { GradientSliderProps } from "./GradientSlider.types";
import {
  generateGradientString,
  GradientInfo,
  GradientStop,
} from "@home-assistant-react/helpers/src/css/parse-gradient-string";
import { MultiSlider, MultiSliderProps } from "../MultiSlider";
import { Box, Flex } from "../../../primitives/common";
import {
  DEFAULT_GRADIENT_ANGLE,
  DEFAULT_GRADIENT_COLOR,
  DEFAULT_GRADIENT_TYPE,
} from "./defines";

const classes = {
  Background: "w-full rounded",
  Thumb: "w-full h-full",
};

export const GradientSlider = React.forwardRef<
  HTMLDivElement,
  GradientSliderProps
>((props, ref) => {
  const { gradient: userGradient, onChange } = props;
  const [gradient, setGradient] = React.useState<GradientInfo>();
  const gradientInfo = userGradient || gradient;

  const getNewGradientInfo = (stops: GradientStop[]): GradientInfo => {
    return {
      type: gradientInfo?.type || DEFAULT_GRADIENT_TYPE,
      angle: gradientInfo?.angle || DEFAULT_GRADIENT_ANGLE,
      stops,
    };
  };

  const gradientBackground =
    gradientInfo && gradientInfo.stops.length > 1
      ? generateGradientString({
          ...gradientInfo,
          angle: DEFAULT_GRADIENT_ANGLE,
          type: DEFAULT_GRADIENT_TYPE,
        })
      : undefined;

  const handleOnChange = (values: number[]) => {
    const newGradientInfo = getNewGradientInfo(
      values.map((value, index) => ({
        color: gradientInfo?.stops?.[index].color || DEFAULT_GRADIENT_COLOR,
        position: value,
      })),
    );
    if (!userGradient) setGradient(newGradientInfo);
    onChange?.(newGradientInfo);
  };

  const handleOnAdd = (value: number) => {
    const stops = gradientInfo?.stops || [];
    const newGradientInfo = getNewGradientInfo([
      ...stops,
      {
        color:
          stops.length > 0
            ? stops[stops.length - 1].color
            : DEFAULT_GRADIENT_COLOR,
        position: value,
      },
    ]);
    if (!userGradient) setGradient(newGradientInfo);
    onChange?.(newGradientInfo);
  };

  const renderThumb: MultiSliderProps["renderThumb"] = (_, index) => (
    <Flex
      className={classes.Thumb}
      style={{ background: gradientInfo?.stops?.[index].color }}
    />
  );

  const renderBackground: MultiSliderProps["renderBackground"] =
    gradientBackground
      ? () => (
          <Box
            style={{ background: gradientBackground }}
            className={classes.Background}
          />
        )
      : undefined;

  return (
    <MultiSlider
      ref={ref}
      renderThumb={renderThumb}
      renderBackground={renderBackground}
      values={gradientInfo?.stops?.map((stop) => stop.position || 0) || []}
      onChange={handleOnChange}
      onAdd={handleOnAdd}
    />
  );
});

GradientSlider.displayName = "GradientSlider";
