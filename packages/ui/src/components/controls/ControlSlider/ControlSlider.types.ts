import { ReactNode } from "react";

export enum ControlSliderDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export interface ControlSliderProps {
  direction?: ControlSliderDirection;
  overlayContent?: ReactNode;
  isHandleFloating?: boolean;

  // Values
  value?: number;
  step?: number;
  min?: number;
  minHandlePercent?: number;
  max?: number;

  // Styling properties
  fillColor?: string;
  backgroundColor?: string;
  thickness?: number;
  roundness?: number;
  opacity?: number;
  maxHeight?: string | number;
  height?: string | number;
  minHeight?: string | number;
  handleSize?: number;
  handleMargin?: number;
  handleColor?: string;

  // Callbacks
  onChange?: (value: number) => void;
  onChangeFinal?: (value: number) => void;
}
