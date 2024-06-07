import React from "react";
import { PanelEditButtonProps } from "./PanelEditButton.types";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { Box } from "../../../../primitives/common";

export const PanelEditButton = React.forwardRef<
  HTMLDivElement,
  PanelEditButtonProps
>((props, ref) => {
  return (
    <Box
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        props.onClick?.(event);
      }}
      className={"z-docked absolute right-0 top-0"}
    >
      {getMdiIcon("pencilCircle", { size: "40px" })}
    </Box>
  );
});

PanelEditButton.displayName = "PanelEditButton";
