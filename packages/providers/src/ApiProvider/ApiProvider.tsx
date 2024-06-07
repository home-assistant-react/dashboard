import React from "react";
import { ApiState } from "@home-assistant-react/types/src";
import { ApiProviderProps } from "./ApiProvider.types";

export const ApiContext = React.createContext<ApiState | null>(null);

export const ApiProvider: React.FC<ApiProviderProps> = ({
  children,
  apiClient,
}) => {
  return (
    <ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>
  );
};

ApiProvider.displayName = "ApiProvider";
