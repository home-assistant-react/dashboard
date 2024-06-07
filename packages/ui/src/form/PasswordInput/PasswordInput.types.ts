import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export type PasswordInputPropsWithFormControl = PasswordInputProps &
  FormControlWrapperProps;

export interface HookFormPasswordInputProps<T extends FieldValues>
  extends Omit<PasswordInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
