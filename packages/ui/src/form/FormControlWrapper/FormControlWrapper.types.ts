import React from "react";
import { VariantProps } from "class-variance-authority";
import { FlexProps } from "../../primitives/common";
import { IconName } from "../../primitives/Icon/Icon.types";
import { formControlWrapperVariants } from "./defines";

export interface FormControlWrapperOptions {
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isOptional?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  error?: React.ReactNode;
  success?: React.ReactNode;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  leftSlot?: React.ReactNode[];
  rightSlot?: React.ReactNode[];
  maxLength?: number;
  minLength?: number;
  showCounter?: boolean;
}

export interface FormControlWrapperState extends FormControlWrapperOptions {
  charactersCounter: number;
  setCharactersCounter: (value: number) => void;
}

export interface FormControlWrapperProps
  extends React.PropsWithChildren,
    FormControlWrapperOptions,
    VariantProps<typeof formControlWrapperVariants> {
  className?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  enableSlotsInputFocus?: boolean;
  enableWrapperInputFocus?: boolean;
  wrapperClassName?: string;
  hideEmptyMessages?: boolean;
}

export interface FormControlLabelProps
  extends React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>> {
  isRequired?: boolean;
  isOptional?: boolean;
  htmlFor?: string;
}

export interface FormControlSlotProps
  extends React.PropsWithChildren,
    FlexProps {}

export const FormControlWrapperForwardedProps = [
  "isDisabled",
  "isReadOnly",
  "isInvalid",
  "isRequired",
  "isOptional",
  "error",
  "success",
  "label",
  "id",
  "leftIcon",
  "rightIcon",
  "helperText",
  "leftSlot",
  "rightSlot",
  "className",
  "wrapperClassName",
  "minLength",
  "maxLength",
  "showCounter",
  "description",
  "hideEmptyMessages",
] as (keyof FormControlWrapperProps)[];
