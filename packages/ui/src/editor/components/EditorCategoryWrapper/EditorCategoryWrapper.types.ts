import { BoxProps } from "../../../primitives/common";
import { ReactNode } from "react";

export interface EditorCategoryWrapperProps extends Omit<BoxProps, "title"> {
  title: ReactNode;
  isCollapsible?: boolean;
  initialIsExpanded?: boolean;
}
