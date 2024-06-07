import { clamp, rad2deg, xy2polar } from "@home-assistant-react/helpers/src";

export const MAX_ANGLE = 270;
export const ROTATE_ANGLE = 360 - MAX_ANGLE / 2 - 90;
export const RADIUS = 145;

export function getPercentageFromEvent(
  sliderRef: HTMLElement | SVGElement,
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent,
) {
  const sliderRect = sliderRef.getBoundingClientRect();
  const x =
    (2 *
      (("clientX" in event ? event.clientX : 0) -
        sliderRect.left -
        sliderRect.width / 2)) /
    sliderRect.width;
  const y =
    (2 *
      (("clientY" in event ? event.clientY : 0) -
        sliderRect.top -
        sliderRect.height / 2)) /
    sliderRect.height;

  const [, phi] = xy2polar(x, y);

  const offset = (360 - MAX_ANGLE) / 2;

  const angle = ((rad2deg(phi) + offset - ROTATE_ANGLE + 360) % 360) - offset;

  return Math.max(Math.min(angle / MAX_ANGLE, 1), 0);
}

export function strokeDashArc(start: number, end: number) {
  const track = (RADIUS * 2 * Math.PI * MAX_ANGLE) / 360;
  const arc = Math.max((end - start) * track, 0);
  const arcOffset = start * track - 0.5;

  const strokeDasharray = `${arc} ${track - arc}`;
  const strokeDashOffset = `-${arcOffset}`;
  return [strokeDasharray, strokeDashOffset];
}

export function valueToPercentage(min: number, max: number, value: number) {
  return (clamp(value, min, max) - min) / (max - min);
}
