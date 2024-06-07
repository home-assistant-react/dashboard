import React from "react";
import { UrlInputPropsWithFormControl } from "./UrlInput.types";
import { TextInput } from "../TextInput";

export const UrlInput = React.forwardRef<
  HTMLInputElement,
  UrlInputPropsWithFormControl
>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

UrlInput.displayName = "UrlInput";
