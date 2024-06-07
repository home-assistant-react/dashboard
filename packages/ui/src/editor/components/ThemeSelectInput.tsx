import React from "react";
import { SelectItem } from "../../components";
import {
  SelectInput,
  SelectInputPropsWithFormControl,
} from "../../form/SelectInput";

export interface ThemeSelectInputProps
  extends Omit<SelectInputPropsWithFormControl, "children"> {}

export const ThemeSelectInput = React.forwardRef<
  React.ElementRef<typeof SelectInput>,
  ThemeSelectInputProps
>((props, ref) => {
  return (
    <SelectInput {...props} ref={ref}>
      <SelectItem value={"light"}>Light</SelectItem>
      <SelectItem value={"dark"}>Dark</SelectItem>
    </SelectInput>
  );
});

ThemeSelectInput.displayName = "ThemeSelectInput";
