import React from "react";
import { PasswordInputPropsWithFormControl } from "./PasswordInput.types";
import { TextInput } from "../TextInput";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputPropsWithFormControl
>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

PasswordInput.displayName = "PasswordInput";
