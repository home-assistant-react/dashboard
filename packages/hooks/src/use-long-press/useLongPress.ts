import React from "react";
import { ClickHandler, LongPressHandler, LongPressOptions } from "./types";

export const useLongPress = (
  onLongPress?: LongPressHandler,
  onClick?: ClickHandler,
  options?: LongPressOptions,
) => {
  const { delay = 500, fireImmediately = true } = options || {};
  const timeoutRef = React.useRef<number | null>(null);
  const startX = React.useRef<number | null>(null);
  const startY = React.useRef<number | null>(null);
  const isLongPress = React.useRef(false);
  const isTouchValid = React.useRef(true);
  const isPressing = React.useRef(false);

  const handleStartPress = (event: MouseEvent | TouchEvent) => {
    if ("button" in event && event.button === 2) return;
    event.preventDefault(); // Prevent the default action for clicks/touches

    isPressing.current = true;
    isTouchValid.current = true;

    // Store the initial touch/click coordinates
    if (event instanceof TouchEvent) {
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
    } else {
      startX.current = event.clientX;
      startY.current = event.clientY;
    }

    // Call the onLongPress callback function after the long press duration
    timeoutRef.current = window.setTimeout(() => {
      if (fireImmediately && isTouchValid.current) {
        onLongPress?.({ type: "longPress", event });
      }
      isLongPress.current = true;
    }, delay);
  };

  const handleEndPress = (event: MouseEvent | TouchEvent) => {
    // Clear the timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check if it was a long press or a normal click
    if (startX.current !== null && startY.current !== null) {
      let endX;
      let endY;

      if (event instanceof TouchEvent) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
      } else {
        endX = event.clientX;
        endY = event.clientY;
      }

      const distanceX = Math.abs(endX - startX.current);
      const distanceY = Math.abs(endY - startY.current);

      if (
        !isLongPress.current &&
        isTouchValid.current &&
        distanceX < 5 &&
        distanceY < 5
      ) {
        if (isLongPress.current && !fireImmediately) {
          onLongPress?.({ type: "longPress", event });
        } else if (onClick) {
          onClick({ type: "click", event });
        }
      }
    }

    startX.current = null;
    startY.current = null;
    isLongPress.current = false;
    isTouchValid.current = true;
    isPressing.current = false;
  };

  const handleCancelOnMove = React.useCallback(() => {
    // If the mouse moves, consider it invalid for long press
    if (isPressing.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      isTouchValid.current = false;
    }
  }, []);

  React.useEffect(() => {
    // Cleanup function to clear the timeout when the component is unmounted
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: handleStartPress as never as (
      event: React.TouchEvent,
    ) => void,
    onTouchEnd: handleEndPress as never as (event: React.TouchEvent) => void,
    onTouchMove: handleCancelOnMove,
    onMouseDown: handleStartPress as never as (event: React.MouseEvent) => void,
    onMouseUp: handleEndPress as never as (event: React.MouseEvent) => void,
    onMouseMove: handleCancelOnMove,
  };
};
