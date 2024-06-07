import { booleanDataAttr, clamp } from "@home-assistant-react/helpers/src";
import { isTouchEnabled } from "@home-assistant-react/helpers/src/dom/isTouchEnabled";
import { svgArc } from "@home-assistant-react/helpers/src/svg/getSvgArc";
import React from "react";
import { cn } from "../../helpers";
import { CircularSliderMode } from "./ClimateSlider.types";
import { useClimateSliderContext } from "./ClimateSliderProvider";
import { MAX_ANGLE, RADIUS, strokeDashArc } from "./helpers";

export interface SliderArcProps {
  type: "value" | "low" | "high";
  value: number | undefined;
  mode: CircularSliderMode;
}

const typeToClasses = {
  value: "stroke-accent",
  low: "stroke-secondary",
  high: "stroke-primary",
};

export const SliderArc: React.FC<SliderArcProps> = (props) => {
  const { type, value, mode } = props;
  const isTouch = isTouchEnabled();

  const {
    isDisabled,
    max,
    min,
    current: currentValue,
    preventInteractionOnScroll,
    step,
    isReadOnly,
    localValue,
  } = useClimateSliderContext();
  if (isDisabled) return null;

  function _steppedValue(value: number) {
    return Math.round(value / step) * step;
  }

  const onlyDotInteraction = (preventInteractionOnScroll && isTouch) || false;

  const path = svgArc({
    x: 0,
    y: 0,
    start: 0,
    end: MAX_ANGLE,
    r: RADIUS,
  });

  function valueToPercentage(value: number) {
    return (clamp(value, min, max) - min) / (max - min);
  }

  function _strokeCircleDashArc(value: number) {
    return strokeDashArc(valueToPercentage(value), valueToPercentage(value));
  }

  const angle =
    value != null ? valueToPercentage(value) * MAX_ANGLE : undefined;

  const limit = mode === "end" ? max : min;

  const current = currentValue ?? limit;
  const target = value ?? limit;

  const showActive =
    mode === "end"
      ? target <= current
      : mode === "start"
        ? current <= target
        : false;

  const showTarget = value != null;

  const activeArc = showTarget
    ? showActive
      ? mode === "end"
        ? strokeDashArc(valueToPercentage(target), valueToPercentage(current))
        : strokeDashArc(valueToPercentage(current), valueToPercentage(target))
      : _strokeCircleDashArc(target)
    : undefined;

  const coloredArc =
    mode === "full"
      ? strokeDashArc(valueToPercentage(min), valueToPercentage(max))
      : mode === "end"
        ? strokeDashArc(valueToPercentage(target), valueToPercentage(limit))
        : strokeDashArc(valueToPercentage(limit), valueToPercentage(target));

  const targetCircle = showTarget ? _strokeCircleDashArc(target) : undefined;

  const currentCircle =
    currentValue != null &&
    currentValue <= max &&
    currentValue >= min &&
    (showActive || mode === "full")
      ? _strokeCircleDashArc(currentValue)
      : undefined;

  return (
    <g>
      <path
        className="arc arc-clear"
        d={path}
        strokeDasharray={coloredArc[0]}
        strokeDashoffset={coloredArc[1]}
      />
      <path
        className={cn("arc arc-colored", typeToClasses[type])}
        d={path}
        strokeDasharray={coloredArc[0]}
        strokeDashoffset={coloredArc[1]}
      />
      {activeArc ? (
        <path
          d={path}
          className={cn("slider arc arc-active", typeToClasses[type])}
          strokeDasharray={activeArc[0]}
          strokeDashoffset={activeArc[1]}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-valuenow={
            localValue != null ? _steppedValue(localValue) : undefined
          }
        />
      ) : null}
      {currentCircle ? (
        <path
          className="current arc-current"
          d={path}
          strokeDasharray={currentCircle[0]}
          strokeDashoffset={currentCircle[1]}
        />
      ) : null}
      {targetCircle ? (
        <>
          <circle
            transform={`rotate(${angle} 0 0)`}
            data-interaction={booleanDataAttr(!onlyDotInteraction)}
            cx={RADIUS}
            cy="0"
          />
          <path
            d={path}
            strokeDasharray={targetCircle[0]}
            strokeDashoffset={targetCircle[1]}
          />
          <path
            className={cn("target-border", typeToClasses[type])}
            d={path}
            strokeDasharray={targetCircle[0]}
            strokeDashoffset={targetCircle[1]}
          />
          <path
            className="target"
            d={path}
            strokeDasharray={targetCircle[0]}
            strokeDashoffset={targetCircle[1]}
          />
        </>
      ) : null}
    </g>
  );
};
