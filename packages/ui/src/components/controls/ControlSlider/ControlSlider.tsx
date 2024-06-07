import React from "react";
import {
  ControlSliderDirection,
  ControlSliderProps,
} from "./ControlSlider.types";
import * as styles from "./ControlSlider.module.scss";
import { Box, Flex } from "../../../primitives/common";
import { cn } from "../../../helpers";
import { cssVars } from "@home-assistant-react/helpers/src/css/cssVars";
import {
  booleanDataAttr,
  getClickPosition,
} from "@home-assistant-react/helpers/src";
import { isSliderReverse, isSliderVertical } from "./helpers";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";
import { bindMoveAndEndEvents } from "@home-assistant-react/helpers/src/ui/bindMoveAndEndEvents";
import { unbindMoveAndEndEvents } from "@home-assistant-react/helpers/src/ui/unbindMoveAndEndEvents";

function roundToNearestMultiple(value: number, multiple = 5): number {
  return Math.round(value / multiple) * multiple;
}
export const ControlSlider = React.forwardRef<
  HTMLDivElement,
  ControlSliderProps
>((props, ref) => {
  const {
    direction = ControlSliderDirection.Up,
    value: userValue,
    step = 1,
    max = 100,
    min = 0,
    fillColor,
    backgroundColor,
    thickness,
    roundness,
    opacity,
    minHandlePercent = 0,
    overlayContent,
    handleSize,
    handleMargin,
    handleColor,
    isHandleFloating,

    onChange,
    onChangeFinal,
  } = props;

  const backgroundRef = React.useRef<HTMLDivElement>(null);

  const [controlledValue, setValue] = React.useState(min);
  const isDragging = useBooleanValue();
  const isVertical = isSliderVertical(direction);
  const isReverse = isSliderReverse(direction);
  const value = isDragging.value
    ? controlledValue
    : userValue ?? controlledValue;

  const updateValue = (event: MouseTouchEvent) => {
    const { x: positionX, y: positionY } = getClickPosition(event);
    const ref = backgroundRef.current;
    if (!ref) return 0;
    const rect = ref.getBoundingClientRect();

    const base = isVertical ? rect.height : rect.width;
    let delta = isVertical ? positionY - rect.top : positionX - rect.left;
    delta = isReverse ? base - delta : delta;

    let result = Math.floor(
      min + (Math.max(Math.min(base, delta), 0) / base) * (max - min),
    );

    if (result < max && result > min) {
      result = roundToNearestMultiple(result, step);
    }

    if (minHandlePercent > 0) {
      const percentValue = Math.round(((result - min) / (max - min)) * 100);
      if (percentValue < minHandlePercent) {
        result = min + (minHandlePercent / 100) * (max - min);
      }
    }

    setValue(result);
    onChange?.(result);
    return result;
  };

  const handleMouseMove = (event: MouseTouchEvent) => {
    updateValue(event);
    isDragging.setTrue();
  };

  const handleMouseUp = (event: MouseTouchEvent) => {
    isDragging.setFalse();
    unbindMoveAndEndEvents(window, handleMouseMove, handleMouseUp);

    onChangeFinal?.(updateValue(event));
  };

  const handleMouseDown = (event: MouseTouchEvent) => {
    updateValue(event);
    bindMoveAndEndEvents(window, handleMouseMove, handleMouseUp);
  };

  const percentValue = Math.round(((value - min) / (max - min)) * 100);

  return (
    <Flex
      ref={ref}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={"Slider"}
      aria-orientation={"vertical"}
      aria-valuenow={value}
      className={cn(
        styles.Wrapper,
        percentValue >= 1 ? styles.showHandle : undefined,
      )}
      data-direction={direction}
      data-dragging={isDragging.value.toString()}
      style={cssVars({
        controlSliderThickness: thickness && `${thickness}px`,
        controlSliderBorderRadius: roundness && `${roundness}px`,
        controlSliderBackground: backgroundColor,
        controlSliderColor: fillColor,
        controlSliderBackgroundOpacity: opacity,
        controlSliderMinHeight: props.minHeight,
        controlSliderMaxHeight: props.maxHeight,
        controlSliderHeight: props.height,
        controlSliderHandleSize: handleSize && `${handleSize}px`,
        controlSliderHandleMargin: handleMargin && `${handleMargin}px`,
        controlSliderHandleColor: handleColor,
        value: Number(percentValue / 100).toFixed(2),
      })}
      role={"slider"}
    >
      <Box
        data-floating-handle={booleanDataAttr(isHandleFloating)}
        className={styles.Slider}
        ref={backgroundRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <Box className={styles.TrackBackground} />
        {isHandleFloating && (
          <Box className={[styles.Handle, "shadow-lg w-full rounded py-2"]} />
        )}
        {!isHandleFloating && (
          <Box className={[styles.TrackBar, "w-full h-full"]} />
        )}

        {overlayContent && (
          <Box className={styles.TrackBarContent}>
            <Box>{overlayContent}</Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
});

ControlSlider.displayName = "ControlSlider";
