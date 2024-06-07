import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";

export interface TextAreaInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  inputClassName?: string;
  showCounter?: boolean;
}

export type TextAreaInputPropsWithFormControl = TextAreaInputProps &
  FormControlWrapperProps;

export interface HookFormTextAreaInputProps<T extends FieldValues>
  extends Omit<TextAreaInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
