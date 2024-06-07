import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";
import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export type TextInputPropsWithFormControl = TextInputProps &
  FormControlWrapperProps;

export interface HookFormTextInputProps<T extends FieldValues>
  extends Omit<TextInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
