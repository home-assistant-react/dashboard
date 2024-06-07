import { ControlSliderDirection } from "./ControlSlider.types";

export const isSliderVertical = (direction: ControlSliderDirection) =>
  direction === ControlSliderDirection.Up ||
  direction === ControlSliderDirection.Down;

export const isSliderReverse = (direction: ControlSliderDirection) =>
  direction === ControlSliderDirection.Up ||
  direction === ControlSliderDirection.Left;
