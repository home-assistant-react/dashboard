import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";

/**
 * Binds mouse and touch move and end events to a specified element.
 *
 * @param element - The element or window to bind the events to.
 * @param moveHandler - The handler function to be called on mouse move and touch move events.
 * @param endHandler - The handler function to be called on mouse up and touch end events.
 *
 * @example
 * // Example usage:
 * const element = document.getElementById('myElement');
 * const handleMove = (event) => { console.log('Moving', event); };
 * const handleEnd = (event) => { console.log('End', event); };
 * bindMoveAndEndEvents(element, handleMove, handleEnd);
 */
export const bindMoveAndEndEvents = (
  element: HTMLElement | Window,
  moveHandler: (event: MouseTouchEvent) => void,
  endHandler: (event: MouseTouchEvent) => void,
) => {
  (element as HTMLElement).addEventListener("mousemove", moveHandler);
  (element as HTMLElement).addEventListener("touchmove", moveHandler);
  (element as HTMLElement).addEventListener("mouseup", endHandler);
  (element as HTMLElement).addEventListener("touchend", endHandler);
};
