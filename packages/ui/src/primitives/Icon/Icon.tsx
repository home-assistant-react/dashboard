import * as Icons from "lucide-react";
import React from "react";
import { IconProps } from "./Icon.types";

export const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { name, color, size = 6, className } = props;
  if (!name) return null;
  const LucideIcon = Icons[`${name}Icon`];
  if (!LucideIcon) {
    throw new Error(`Icon ${name} not found`);
  }
  return (
    <LucideIcon
      color={color}
      size={size}
      className={className}
      width={size ? `${size * 4}px` : undefined}
      height={size ? `${size * 4}px` : undefined}
      ref={ref}
    />
  );
});

Icon.displayName = "Icon";
