import React from "react";
import { CardTitleProps } from "../../../primitives/Card";
import { BoxProps } from "../../../primitives/common";

export interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  action?: React.MouseEventHandler<HTMLDivElement>;
  actionName?: React.ReactNode;
  isGhost?: boolean;
  extra?: React.ReactNode;
  actionComponent?: React.ReactNode;
  subtitle?: React.ReactNode;
  headingProps?: CardTitleProps;
}
