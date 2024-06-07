import React from "react";
import { Base, UIBaseComponent } from "../Base";
import { BoxProps } from "./Box.types";

export const Box: UIBaseComponent<BoxProps, HTMLDivElement> = React.forwardRef(
  (props, ref) => {
    return <Base {...props} ref={ref} />;
  },
);

Box.displayName = "Box";
