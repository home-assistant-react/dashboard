import React, { FormEvent, FormHTMLAttributes } from "react";
import { BoxProps } from "../../primitives/common";

export interface FormWrapperState {
  isDisabled: boolean;
  isLoading: boolean;
}

export interface FormWrapperProviderProps extends React.PropsWithChildren {
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface FormWrapperProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFormContainer?: boolean;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  disableOnSubmit?: boolean;
}
