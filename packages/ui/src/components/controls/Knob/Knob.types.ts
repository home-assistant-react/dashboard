import React from "react";

export interface KnobProps {
  size?: number;
  min?: number;
  max?: number;
  value?: number;
  degrees?: number;
  onChange?: (value: number) => void;
  numTicks?: number;
}

export interface RenderTickOptions {
  deg: number;
  tickStyle: React.CSSProperties;
}

export interface TickOptions {
  size: number;
  numTicks: number;
  degrees: number;
  startAngle: number;
  endAngle: number;
}
