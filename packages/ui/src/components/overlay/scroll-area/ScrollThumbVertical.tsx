import React from "react";
import { Box, BoxProps } from "../../../primitives/common";

const classes = {
  ThumbVertical:
    "thumb-vertical cursor-pointer z-sticky bg-black/30 rounded-[inherit]",
};

export const ScrollThumbVertical: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props} className={[classes.ThumbVertical, props.className]} />
  );
};
