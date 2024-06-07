import React from "react";
import { Base, UIBaseComponent } from "../Base";
import { GridProps } from "./Grid.types";

export const Grid: UIBaseComponent<GridProps, HTMLDivElement> =
  React.forwardRef((props, ref) => {
    return (
      <Base
        {...props}
        className={[
          "grid",
          ...(Array.isArray(props.className)
            ? props.className
            : [props.className ?? ""]),
        ]}
        ref={ref}
      />
    );
  });

Grid.displayName = "Grid";
