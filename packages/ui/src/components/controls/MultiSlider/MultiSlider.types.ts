import React from "react";

export interface MultiSliderProps {
  values?: number[];
  renderThumb?: (value: number, index: number) => React.ReactNode;
  renderBackground?: (values: number[]) => React.ReactNode;
  onChange?: (values: number[]) => void;
  onAdd?: (value: number) => void;
}
