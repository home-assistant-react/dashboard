import { BoxProps } from "../../../primitives/common";

export enum SpinnerSize {
  Small = "Small",
  Standard = "Standard",
  Large = "Large",
}

interface SpinnerOptions {
  emptyColor?: string;
  color?: string;
  thickness?: number;
  speed?: string;
  label?: string;

  size?: SpinnerSize | number;
  value?: number;
  isIndeterminate?: boolean;
}

export interface SpinnerProps extends Omit<BoxProps, "size">, SpinnerOptions {}
