import React from "react";
import {
  FormWrapperProviderProps,
  FormWrapperState,
} from "./FormWrapper.types";

export const FormWrapperContext = React.createContext<
  FormWrapperState | undefined
>(undefined);

export const FormWrapperProvider: React.FC<FormWrapperProviderProps> = (
  props,
) => {
  const { children, ...state } = props;
  return (
    <FormWrapperContext.Provider
      value={{
        isLoading: state.isLoading || false,
        isDisabled: state.isDisabled || false,
      }}
    >
      {children}
    </FormWrapperContext.Provider>
  );
};

export const useFormWrapper = (skipError?: boolean) => {
  const context = React.useContext(FormWrapperContext);
  if (!skipError && context === undefined) {
    throw new Error("useFormWrapper must be used within a FormWrapperContext");
  }
  return context as FormWrapperState;
};
