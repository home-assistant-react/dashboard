import { getUniqueId } from "@home-assistant-react/helpers/src";
import React from "react";
import {
  FormControlWrapperProps,
  FormControlWrapperState,
} from "./FormControlWrapper.types";

export const FormControlWrapperContext = React.createContext<
  FormControlWrapperState | undefined
>(undefined);

export const FormControlWrapperProvider: React.FC<FormControlWrapperProps> = (
  props,
) => {
  const { children, ...state } = props;
  const fallbackInputId = React.useId();
  const inputId = React.useMemo(
    () => state.id || fallbackInputId || getUniqueId(),
    [state.id],
  );
  const [counter, setCounter] = React.useState<number>(0);
  return (
    <FormControlWrapperContext.Provider
      value={{
        ...state,
        charactersCounter: counter,
        setCharactersCounter: setCounter,
        id: inputId,
        isInvalid:
          state.isInvalid !== undefined ? state.isInvalid : !!state.error,
        isLoading: props.isLoading,
      }}
    >
      {children}
    </FormControlWrapperContext.Provider>
  );
};

export const useFormControlWrapper = () => {
  const context = React.useContext(FormControlWrapperContext);
  return context || ({} as Partial<FormControlWrapperState>);
};
