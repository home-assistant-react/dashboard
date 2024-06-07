import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";

/**
 * Retrieves the x and y coordinates of a click or touch event.
 *
 * @param event - The event object from a mouse or touch event.
 * @returns An object containing the x and y coordinates of the click or touch position.
 *
 * @example
 * // Example usage:
 * const handleClick = (event) => {
 *   const position = getClickPosition(event);
 *   console.log(position); // Outputs: { x: <number>, y: <number> }
 * };
 */
export const getClickPosition = (event: MouseTouchEvent) => {
  const x = "touches" in event ? event.touches[0].clientX || 0 : event.clientX;
  const y = "touches" in event ? event.touches[0].clientY || 0 : event.clientY;

  return { x, y };
};
