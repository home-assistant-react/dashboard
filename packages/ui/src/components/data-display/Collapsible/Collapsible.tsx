import React from "react";
import { cn } from "../../../helpers";
import { Box, Grid } from "../../../primitives/common";
import { CollapsibleProps } from "./Collapsible.types";

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (props, ref) => {
    const { isOpen, children, ...rest } = props;

    return (
      <Grid
        ref={ref}
        {...rest}
        className={cn("transition-all", rest.className)}
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? "1" : "0",
          ...rest.style,
        }}
      >
        <Box className={"overflow-hidden"}>{children}</Box>
      </Grid>
    );
  },
);

Collapsible.displayName = "Collapsible";
