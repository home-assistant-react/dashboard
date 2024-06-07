import React from "react";
import { Box } from "../../../primitives/common";
import { DividerProps } from "./Divider.types";

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ spacing = 6, ...props }, ref) => {
    return (
      <Box
        data-testid={"general-divider"}
        {...props}
        style={
          spacing
            ? { marginBottom: (spacing * 4) / 2, marginTop: (spacing * 4) / 2 }
            : undefined
        }
        className={[
          "border-b border-b-transparent md:border-b-border",
          "h-0.5 md:h-0",
          props.className,
        ]}
        ref={ref}
      />
    );
  },
);

Divider.displayName = "Divider";
