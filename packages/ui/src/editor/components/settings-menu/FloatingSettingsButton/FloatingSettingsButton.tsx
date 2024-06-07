import React from "react";
import { FloatingSettingsButtonProps } from "./FloatingSettingsButton.types";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { Box } from "../../../../primitives/common";
import { useDashboardEditor } from "@home-assistant-react/api/src";

const classes = {
  Button:
    "rounded-full bg-primary-background p-2 transition-all absolute bottom-[-10px] right-[-10px] hover:right-0 hover:bottom-0 hover:cursor-pointer",
};

export const FloatingSettingsButton = React.forwardRef<
  HTMLDivElement,
  FloatingSettingsButtonProps
>((_props, ref) => {
  const { isArranging } = useDashboardEditor();
  return (
    <Box ref={ref} className={classes.Button} onClick={isArranging.toggle}>
      {getMdiIcon("cog")}
    </Box>
  );
});

FloatingSettingsButton.displayName = "FloatingSettingsButton";
