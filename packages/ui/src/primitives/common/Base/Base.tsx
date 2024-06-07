import React from "react";
import { cn } from "../../../helpers";
import { BaseProps, UIBaseComponent } from "./Base.types";

export const Base: UIBaseComponent<BaseProps, unknown> = React.forwardRef(
  (props, ref) => {
    const { children, className, as, srOnly, ...rest } = props;
    const _classNames =
      cn(className, srOnly ? "sr-only" : undefined) || undefined;
    return React.createElement(
      as || "div",
      Object.assign({}, rest, {
        ref: ref,
        className: _classNames,
      }),
      React.Children.count(children) ? children : undefined,
    );
  },
);

Base.displayName = "Base";
