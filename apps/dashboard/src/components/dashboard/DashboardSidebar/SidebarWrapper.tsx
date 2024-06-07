import { Box, BoxProps } from "@home-assistant-react/ui/src";
import React from "react";

export interface SidebarWrapperProps extends BoxProps {
  isColumn?: boolean;
  position: "left" | "right" | "top" | "bottom";
  size: number;
}

const classes = {
  Wrapper: "bg-primary-background/60 backdrop-blur-xl bg-d",
  WrapperColumn: "flex h-[100px]",
  WrapperRow: "h-full w-[300px] flex-col",
  PositionLeft: "border-r overflow-auto",
  PositionRight: "border-l overflow-y-auto overflow-x-hidden",
  PositionTop: "border-b overflow-x-auto items-center",
  PositionBottom: "border-t border-b overflow-x-auto overflow-y-hidden",
};

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
  isColumn,
  position,
  size,
  ...rest
}) => {
  const wrapperStyle = { ...rest.style };

  wrapperStyle[isColumn ? "height" : "width"] =
    `${(size || 25) * (isColumn ? 4 : 10)}px`;

  return (
    <Box
      {...rest}
      className={[
        classes.Wrapper,
        isColumn ? classes.WrapperColumn : classes.WrapperRow,
        position === "left" && classes.PositionLeft,
        position === "right" && classes.PositionRight,
        position === "top" && classes.PositionTop,
        position === "bottom" && classes.PositionBottom,
        rest.className,
      ]}
      style={wrapperStyle}
    />
  );
};
