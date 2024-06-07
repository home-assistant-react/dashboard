import { HookFormInputProps } from "@home-assistant-react/helpers/src/hook-form/types";
import { SelectProps } from "@radix-ui/react-select";
import { FormControlWrapperProps } from "../FormControlWrapper";
import { FieldValues } from "react-hook-form";
import React from "react";

export interface SelectInputProps extends SelectProps {
  inputClassName?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  addEmptyOption?: boolean;
  className?: string;
}

export type SelectInputPropsWithFormControl = React.PropsWithChildren<
  SelectInputProps & FormControlWrapperProps
>;

export interface HookFormSelectInputProps<T extends FieldValues>
  extends Omit<SelectInputPropsWithFormControl, "form" | "name">,
    HookFormInputProps<T> {}
