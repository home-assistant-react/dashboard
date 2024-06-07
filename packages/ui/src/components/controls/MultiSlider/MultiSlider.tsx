import React from "react";
import { MultiSliderProps } from "./MultiSlider.types";
import { Box, Flex } from "../../../primitives/common";

const classes = {
  Wrapper: "border rounded h-10 p-1 box-border relative cursor-copy w-full",
  WrapperMoving: "cursor-grab",
  Background: "w-full bg-[#efefef]",
  ThumbsContainer: "left-0 right-5 absolute top-[-5px]",
  Thumb: "w-5 h-12 cursor-grab absolute",
  ThumbInner:
    "w-full h-full rounded bg-primary-background p-0.5 shadow-md border",
  ThumbPreview: "left-0 right-6 absolute top-[-5px]",
};

export const MultiSlider = React.forwardRef<HTMLDivElement, MultiSliderProps>(
  (props, ref) => {
    const barRef = React.useRef<HTMLDivElement>(null);
    const [values, setValues] = React.useState(props.values || []);
    const [movingIndex, setMovingIndex] = React.useState<number | null>(null);
    const thumbsRef = React.useRef<HTMLDivElement[]>([]);
    const [startX, setStartX] = React.useState<number | null>(null);
    const [draggingStartX, setDraggingStartX] = React.useState<number | null>();

    const currentValues = props.values || values;

    const updateThumbRef = (index: number) => (ref: HTMLDivElement) => {
      thumbsRef.current[index] = ref;
    };
    const handleThumbMuseDown = (
      event: React.MouseEvent | React.TouchEvent,
      index: number,
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const thumbRef = thumbsRef.current[index];
      if (!thumbRef) return;
      setMovingIndex(index);
      setStartX(thumbRef.offsetLeft || 0);
      setDraggingStartX(
        "touches" in event ? event.touches[0].clientX || 0 : event.clientX,
      );
    };

    const handleThumbMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (movingIndex === null) return;
      const thumbRef = thumbsRef.current[movingIndex];
      if (!thumbRef) return;
      const clientX =
        "touches" in event ? event.touches[0].clientX || 0 : event.clientX;
      const deltaX = clientX - (draggingStartX || 0);
      const barWidth = barRef.current?.getBoundingClientRect()?.width || 0;
      const newThumbPosition = Math.max(
        Math.min(barWidth, (startX || 0) + deltaX),
        0,
      );

      const newValues = [...currentValues];
      newValues[movingIndex] = Math.floor((newThumbPosition / barWidth) * 100);

      setValues(newValues);

      props.onChange?.(newValues);
    };

    const handleThumbMouseUp = () => {
      setMovingIndex(null);
    };

    const handleBackgroundMouseDown = (event: React.MouseEvent) => {
      const _barRef = barRef.current;
      if (!_barRef) return;
      if (_barRef.contains(event.target as Node)) return;

      const barLeft = _barRef.getBoundingClientRect().left;
      const barWidth = _barRef.getBoundingClientRect().width;
      const clientX = event.clientX;
      const deltaX = clientX - barLeft;
      const newThumbPosition = Math.max(Math.min(barWidth, deltaX), 0);
      const newValues = [...currentValues];
      const newValue = Math.floor((newThumbPosition / barWidth) * 100);
      newValues.push(newValue);
      setValues(newValues);
      props.onAdd?.(newValue);
    };

    const isMoving = movingIndex !== null;

    React.useEffect(() => {
      const removeListeners = () => {
        window.removeEventListener("mousemove", handleThumbMouseMove);
        window.removeEventListener("mouseup", handleThumbMouseUp);
      };

      if (movingIndex === null) {
        removeListeners();
        return;
      }

      window.addEventListener("mousemove", handleThumbMouseMove);
      window.addEventListener("mouseup", handleThumbMouseUp);

      return removeListeners;
    }, [movingIndex]);

    return (
      <Flex
        ref={ref}
        className={[classes.Wrapper, isMoving && classes.WrapperMoving]}
        onClick={handleBackgroundMouseDown}
      >
        {props.renderBackground ? (
          props.renderBackground(currentValues)
        ) : (
          <Box className={classes.Background} />
        )}
        <Box
          ref={barRef}
          className={classes.ThumbsContainer}
          style={{ top: "-5px" }}
        >
          {currentValues.map((value, index) => {
            return (
              <Flex
                key={`value-${index}-${value}`}
                ref={updateThumbRef(index)}
                onMouseDown={(event) => {
                  handleThumbMuseDown(event, index);
                }}
                onTouchStart={(event) => {
                  handleThumbMuseDown(event, index);
                }}
                className={classes.Thumb}
                style={{
                  left: `${value}%`,
                }}
              >
                <Flex className={classes.ThumbInner}>
                  {props.renderThumb ? (
                    props.renderThumb(value, index)
                  ) : (
                    <Flex className={classes.ThumbPreview} />
                  )}
                </Flex>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    );
  },
);

MultiSlider.displayName = "MultiSlider";
