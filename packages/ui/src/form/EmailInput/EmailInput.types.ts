import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";

export interface EmailInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export type EmailInputPropsWithFormControl = EmailInputProps &
  FormControlWrapperProps;

export interface HookFormEmailInputProps<T extends FieldValues>
  extends Omit<EmailInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
