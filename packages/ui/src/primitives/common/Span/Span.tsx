import React from "react";
import { Base, UIBaseComponent } from "../Base";
import { SpanProps } from "./Span.types";

export const Span: UIBaseComponent<SpanProps, HTMLSpanElement> =
  React.forwardRef((props, ref) => {
    return <Base {...props} as={props.as || "span"} ref={ref} />;
  });

Span.displayName = "Span";
