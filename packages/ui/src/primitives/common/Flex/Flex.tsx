import React from "react";
import { Base, UIBaseComponent } from "../Base";
import { FlexProps } from "./Flex.types";

export const Flex: UIBaseComponent<FlexProps, HTMLDivElement> =
  React.forwardRef((props, ref) => {
    return (
      <Base
        {...props}
        className={[
          "flex",
          ...(Array.isArray(props.className)
            ? props.className
            : [props.className ?? ""]),
        ]}
        ref={ref}
      />
    );
  });

Flex.displayName = "Flex";
