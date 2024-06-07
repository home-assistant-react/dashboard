import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import { FlexProps } from "../../primitives/common";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";
import React from "react";

export interface SwitchInputProps extends FlexProps {
  inputClassName?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
}

export type SwitchInputPropsWithFormControl = React.PropsWithChildren<
  SwitchInputProps & FormControlWrapperProps
>;

export interface HookFormSwitchInputProps<T extends FieldValues>
  extends Omit<SwitchInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
