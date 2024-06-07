import React from "react";
import { EmailInputPropsWithFormControl } from "./EmailInput.types";
import { TextInput } from "../TextInput";

export const EmailInput = React.forwardRef<
  HTMLInputElement,
  EmailInputPropsWithFormControl
>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

EmailInput.displayName = "EmailInput";
