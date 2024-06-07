import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export type NumberInputPropsWithFormControl = NumberInputProps &
  FormControlWrapperProps;

export interface HookFormNumberInputProps<T extends FieldValues>
  extends Omit<NumberInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
