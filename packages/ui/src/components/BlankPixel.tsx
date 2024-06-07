import React from "react";
import { Box } from "../primitives/common";

export const BlankPixel = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <Box
      ref={ref}
      className={
        "w-px h-px bg-transparent border-0 outline-none outline-0 cursor-pointer absolute top-0 left-0 z-[1] opacity-0 focus:outline-none"
      }
    />
  );
});

BlankPixel.displayName = "BlankPixel";
