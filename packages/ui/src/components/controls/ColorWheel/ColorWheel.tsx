import React from "react";
import { ColorWheelProps } from "./ColorWheel.types";
import {
  adjustRgb,
  booleanDataAttr,
  hsv2rgb,
} from "@home-assistant-react/helpers/src";
import { Box } from "../../../primitives/common";
import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";
import {
  drawWheel,
  getCoordsFromValue,
  getPositionFromEvent,
  getValueFromCoord,
} from "./helpers";
import { useBooleanValue } from "@home-assistant-react/hooks/src";

const classes = {
  Wrapper: "relative",
  CursorContainer: "absolute top-0 left-0 w-full h-full pointer-events-none",
};

export const ColorWheel = React.forwardRef<HTMLDivElement, ColorWheelProps>(
  ({ onChange, onChangeFinal, brightness, selectedColor, size }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const isDragging = useBooleanValue();
    const [cursorPosition, setCursorPosition] = React.useState<{
      x: number;
      y: number;
    }>({ x: 0, y: 0 });
    const [colorValue, setColorValue] = React.useState<
      [number, number] | undefined
    >();

    const color = isDragging.value ? colorValue : selectedColor || colorValue;

    React.useEffect(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      drawWheel(ctx, size);
    }, [size]);

    React.useEffect(() => {
      if (color) {
        const [x, y] = getCoordsFromValue(color);
        setCursorPosition({ x: ((x + 1) * size) / 2, y: ((y + 1) * size) / 2 });
      }
    }, [color]);

    const handleMouseEvent = (
      event: MouseTouchEvent<HTMLCanvasElement>,
      isFinal = false,
    ) => {
      const [x, y] = getPositionFromEvent(canvasRef.current, event);
      const [hue, saturation] = getValueFromCoord(x, y);

      setColorValue([hue, saturation]);
      isFinal
        ? onChangeFinal?.([hue, saturation])
        : onChange?.([hue, saturation]);
    };

    const handleMouseMove = (event: MouseTouchEvent<HTMLCanvasElement>) => {
      isDragging.setTrue();
      handleMouseEvent(event);
    };

    const handleMouseUp = (event: MouseTouchEvent<HTMLCanvasElement>) => {
      isDragging.setFalse();
      handleMouseEvent(event, true);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    const onMouseDown = (event: MouseTouchEvent<HTMLCanvasElement>) => {
      handleMouseEvent(event);

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    let rgbColor = [0, 0, 0];
    if (color && color.length >= 2) {
      rgbColor = adjustRgb(
        hsv2rgb([
          color[0],
          color[1],
          brightness ? (brightness * 255) / 100 : 255,
        ]),
        0,
        0,
        0,
      );
    }

    return (
      <Box
        ref={ref}
        data-dragging={booleanDataAttr(isDragging.value)}
        className={classes.Wrapper}
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onMouseDown={onMouseDown}
        />
        <svg
          width={size}
          height={size}
          className={classes.CursorContainer}
          overflow={"visible"}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Cursor */}
          <g
            style={{
              transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
              filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.5))",
              ...(!isDragging.value
                ? {
                    transition: "transform 0.2s ease-in-out 0s",
                  }
                : undefined),
            }}
          >
            <circle
              cx={0}
              cy={0}
              r={14}
              fill={
                rgbColor
                  ? `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
                  : "#FFF"
              }
              stroke="white"
              strokeWidth="2"
              style={{
                ...(isDragging.value
                  ? {
                      transition: "transform 0.2s ease-in-out 0s",
                      transform: "scale(1.5)",
                    }
                  : {
                      transition: "fill 0.2s ease-in-out 0s",
                    }),
              }}
            />
          </g>
        </svg>
      </Box>
    );
  },
);

ColorWheel.displayName = "ColorWheel";
