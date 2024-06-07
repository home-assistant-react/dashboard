import React from "react";

export interface OverlayButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
  className?: string;
}
