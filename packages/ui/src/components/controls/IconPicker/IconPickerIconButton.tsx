import React from "react";
import { IconFromSet } from "./IconFromSet";
import { Box } from "../../../primitives/common";
import { OverlayButton } from "../../buttons";
import { IconPickerIconButtonProps } from "./IconPicker.types";

const classes = {
  IconName: "text-xs w-full pt-2 text-center break-words",
  IconButton:
    "flex-col items-center max-w-[82px] rounded p-2 hover:bg-accent hover:cursor-pointer",
};

export const IconPickerIconButton: React.FC<IconPickerIconButtonProps> = ({
  icon,
  iconName,
  onClick,
  iconSet,
}) => {
  return (
    <OverlayButton className={classes.IconButton} onClick={onClick}>
      <IconFromSet icon={{ icon, set: iconSet }} />
      <Box className={classes.IconName}>{iconName}</Box>
    </OverlayButton>
  );
};
