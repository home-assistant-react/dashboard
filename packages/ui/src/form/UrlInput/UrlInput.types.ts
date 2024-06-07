import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import React from "react";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";

export interface UrlInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  requireProtocol?: boolean;
}

export type UrlInputPropsWithFormControl = UrlInputProps &
  FormControlWrapperProps;

export interface HookFormUrlInputProps<T extends FieldValues>
  extends Omit<UrlInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
