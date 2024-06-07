import { buttonVariants } from "./Button.variants";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { IconName, IconProps } from "../Icon/Icon.types";

export interface ButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "disabled" | "color"
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  label?: React.ReactNode;
  icon?: IconName | IconProps;
  iconRight?: IconName | IconProps;
  wrapperClassName?: string;
}
