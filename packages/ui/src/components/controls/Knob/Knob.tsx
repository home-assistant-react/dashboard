import React from "react";
import { Box, Flex } from "../../../primitives/common";
import { KnobProps } from "./Knob.types";
import { convertRange, getDeg } from "./helpers";
import { KnobTicks } from "./KnobTicks";

const classes = {
  Wrapper: "relative",
  Ticks: "relative",
  Knob: "rounded-full items-center justify-center bg-accent relative border border-transparent",
  InnerKnob: "rounded-full relative",
  Thumb:
    "bg-primary rounded-full absolute w-[25%] h-[25%] bottom-[2%] left-[50%]",
};

export const Knob: React.FC<KnobProps> = React.forwardRef<
  HTMLDivElement,
  KnobProps
>((props, ref) => {
  const {
    size = 50,
    min = 0,
    max = 100,
    degrees = 360,
    numTicks = 0,
    value,
    onChange,
  } = props;

  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.1;
  const [currentDeg, setCurrentDeg] = React.useState(
    Math.floor(convertRange(min, max, startAngle, endAngle, value || 0)),
  );
  const outerSizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const innerSizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const knob = (e.target as HTMLDivElement).getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX || 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY || 0 : e.clientY;
      let _currentDeg = getDeg(startAngle, endAngle, clientX, clientY, pts);
      if (_currentDeg === startAngle) _currentDeg--;
      const newValue = Math.floor(
        convertRange(startAngle, endAngle, min, max, _currentDeg),
      );
      setCurrentDeg(_currentDeg);
      onChange?.(newValue);
    };
    moveHandler(e as unknown as MouseEvent);
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  return (
    <Flex className={classes.Wrapper} style={outerSizeStyle} ref={ref}>
      <Box className={classes.Ticks}>
        <KnobTicks
          size={size}
          currentDeg={currentDeg}
          endAngle={endAngle}
          numTicks={numTicks}
          degrees={degrees}
          startAngle={startAngle}
        />
      </Box>
      <Flex
        className={classes.Knob}
        style={{ ...outerSizeStyle, margin }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <Flex
          className={classes.InnerKnob}
          style={{ transform: `rotate(${currentDeg}deg)`, ...innerSizeStyle }}
        >
          <Box
            className={classes.Thumb}
            style={{ transform: "translateX(-50%)" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
});

Knob.displayName = "Knob";
