import React, { PropsWithChildren } from "react";
import {
  CreateContextOptions,
  CreateContextReturn,
} from "./createContext.types";

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  type ContextTypeWithUpdate = T & {
    updateContext: (value: Partial<T>) => void;
  };

  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Context = React.createContext<T | undefined>(defaultValue);

  Context.displayName = name;

  function useContext(): ContextTypeWithUpdate {
    const context = React.useContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ?? `${hookName} must be used within a ${providerName}`,
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context as ContextTypeWithUpdate;
  }

  const ContextProvider: React.FC<PropsWithChildren<{ value: T }>> = ({
    value,
    children,
    ...rest
  }) => {
    const [contextValue, setContextValue] = React.useState<T>(value);

    React.useEffect(() => {
      setContextValue((prev) => ({ ...prev, ...value }));
    }, [JSON.stringify(value)]);

    const updateContext = (value: Partial<T>) => {
      setContextValue((prev) => ({ ...prev, ...value }));
    };

    return (
      <Context.Provider value={{ ...contextValue, updateContext }} {...rest}>
        {children}
      </Context.Provider>
    );
  };

  return [ContextProvider, useContext, Context] as CreateContextReturn<T>;
}
