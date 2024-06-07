import { booleanDataAttr } from "@home-assistant-react/helpers/src";
import { isTouchEnabled } from "@home-assistant-react/helpers/src/dom/isTouchEnabled";
import { svgArc } from "@home-assistant-react/helpers/src/svg/getSvgArc";
import { useDrag } from "@use-gesture/react";
import React from "react";
import { cn } from "../../helpers";
import { Box } from "../../primitives/common";
import { ActiveSlider } from "./ClimateSlider.types";
import { useClimateSliderContext } from "./ClimateSliderProvider";
import {
  getPercentageFromEvent,
  MAX_ANGLE,
  RADIUS,
  ROTATE_ANGLE,
  strokeDashArc,
  valueToPercentage,
} from "./helpers";
import { SliderArc } from "./SliderArc";

const classes = {
  Background: "background fill-none stroke-black opacity-10",
};

export const ClimateSliderController: React.FC = () => {
  const isTouch = isTouchEnabled();

  const {
    isDisabled,
    isReadOnly,
    max,
    min,
    localLow,
    localHigh,
    localValue,
    mode,
    isDual,
    setLocalValue,
    setLocalLow,
    setLocalHigh,
    lastSlider,
    preventInteractionOnScroll,
    current,
  } = useClimateSliderContext();

  const sliderRef = React.useRef<SVGSVGElement | null>(null);
  const [activeSlider, setActiveSlider] = React.useState<
    ActiveSlider | undefined
  >(undefined);

  const trackPath = React.useMemo(() => {
    return svgArc({
      x: 0,
      y: 0,
      start: 0,
      end: MAX_ANGLE,
      r: RADIUS,
    });
  }, []);

  const currentStroke = React.useMemo(() => {
    return current
      ? strokeDashArc(
          valueToPercentage(min, max, current),
          valueToPercentage(min, max, current),
        )
      : undefined;
  }, [current]);

  const onlyDotInteraction = (preventInteractionOnScroll && isTouch) || false;

  function percentageToValue(value: number) {
    return (max - min) * value + min;
  }

  function boundedValue(_activeSlider: string, value: number) {
    const _min = _activeSlider === "high" ? Math.min(localLow ?? max) : min;
    const _max = _activeSlider === "low" ? Math.max(localHigh ?? min) : max;
    return Math.min(Math.max(value, _min), _max);
  }

  function findActiveSlider(value: number): ActiveSlider {
    if (!isDual) return "value";
    const low = Math.max(localLow ?? min, min);
    const high = Math.min(localHigh ?? max, max);
    if (low >= value) {
      return "low";
    }
    if (high <= value) {
      return "high";
    }
    const lowDistance = Math.abs(value - low);
    const highDistance = Math.abs(value - high);
    return lowDistance <= highDistance ? "low" : "high";
  }

  function setActiveValue(_activeSlider: string, value: number) {
    switch (_activeSlider) {
      case "high":
        setLocalHigh(value);
        break;
      case "low":
        setLocalLow(value);
        break;
      case "value":
        setLocalValue(value);
        break;
    }
  }

  const bindDrag = useDrag(
    ({ event, tap }) => {
      event.stopPropagation();
      event.preventDefault();

      if (isDisabled || isReadOnly || !sliderRef.current) return;

      if (tap) setActiveSlider(undefined);

      if (!event.target || !("hasAttribute" in event.target)) return;

      if (
        event.target instanceof HTMLDivElement &&
        !event.target.hasAttribute("data-interaction")
      ) {
        return;
      }

      const percentage = getPercentageFromEvent(sliderRef.current, event);
      const raw = percentageToValue(percentage);
      const activeSlider = findActiveSlider(raw);
      const bounded = boundedValue(activeSlider, raw);
      setActiveSlider(tap ? undefined : activeSlider);
      setActiveValue(activeSlider, bounded);
    },
    { filterTaps: true },
  );

  const lowValue = isDual ? localLow : localValue;
  const highValue = localHigh;

  return (
    <Box
      className={"w-full h-full"}
      style={{ touchAction: "none" }}
      {...bindDrag()}
    >
      <svg
        ref={sliderRef}
        className={cn("thermostat-slider", !!activeSlider && "pressed")}
        viewBox="0 0 320 320"
        overflow="visible"
        tabIndex={lastSlider ? 0 : -1}
      >
        <g transform={`translate(160 160) rotate(${ROTATE_ANGLE})`}>
          <path
            d={trackPath}
            data-interaction={booleanDataAttr(!onlyDotInteraction)}
          />
          <path
            className={classes.Background}
            d={trackPath}
            strokeWidth={24}
            strokeLinecap={"round"}
          />
          {!!currentStroke && (
            <path
              className="current"
              d={trackPath}
              strokeDasharray={currentStroke[0]}
              strokeDashoffset={currentStroke[1]}
            />
          )}
          {lowValue != null || mode === "full" ? (
            <SliderArc
              type={isDual ? "low" : "value"}
              value={lowValue}
              mode={(!isDual && mode) || "start"}
            />
          ) : null}
          {isDual && highValue != null ? (
            <SliderArc type={"high"} value={highValue} mode={"end"} />
          ) : null}
        </g>
      </svg>
    </Box>
  );
};
