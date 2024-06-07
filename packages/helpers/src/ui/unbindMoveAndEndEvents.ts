import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";

/**
 * Unbinds mouse and touch move and end events from a specified element.
 *
 * @param element - The element or window from which the events will be removed.
 * @param moveHandler - The handler function to be removed from mouse move and touch move events.
 * @param endHandler - The handler function to be removed from mouse up and touch end events.
 *
 * @example
 * // Example usage:
 * const element = document.getElementById('myElement');
 * const handleMove = (event) => { console.log('Moving', event); };
 * const handleEnd = (event) => { console.log('End', event); };
 *
 * // Bind events
 * bindMoveAndEndEvents(element, handleMove, handleEnd);
 *
 * // Unbind events
 * unbindMoveAndEndEvents(element, handleMove, handleEnd);
 */
export const unbindMoveAndEndEvents = (
  element: HTMLElement | Window,
  moveHandler: (event: MouseTouchEvent) => void,
  endHandler: (event: MouseTouchEvent) => void,
) => {
  (element as HTMLElement).removeEventListener("mousemove", moveHandler);
  (element as HTMLElement).removeEventListener("touchmove", moveHandler);
  (element as HTMLElement).removeEventListener("mouseup", endHandler);
  (element as HTMLElement).removeEventListener("touchend", endHandler);
};
