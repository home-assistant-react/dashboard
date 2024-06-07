import { icons } from "lucide-react";
import React from "react";
export type IconName = keyof typeof icons;
export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}
