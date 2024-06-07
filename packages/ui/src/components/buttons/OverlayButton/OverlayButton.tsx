import { Flex } from "../../../primitives/common";
import React from "react";
import { OverlayButtonProps } from "./OverlayButton.types";

export const OverlayButton = React.forwardRef<
  HTMLDivElement,
  OverlayButtonProps
>((props, ref) => {
  const { isDisabled, className, onClick, ...rest } = props;
  return (
    <Flex
      onClick={!isDisabled ? onClick : undefined}
      ref={ref}
      {...rest}
      className={["select-none", className]}
    />
  );
});

OverlayButton.displayName = "OverlayButton";
