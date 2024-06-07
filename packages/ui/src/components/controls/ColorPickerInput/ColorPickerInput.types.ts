import React from "react";

export interface ColorPickerInputProps {
  color?: string;
  position?: number;
  onChange?: (color: string, position: number) => void;
  onClear?: () => void;
  hasPosition?: boolean;
  isClearable?: boolean;
  label?: React.ReactNode;
}
