import React from "react";
import { PropertyControllerProviderProps } from "./PropertyControllerProvider.types";
import { PropertyControllerState } from "@home-assistant-react/types/src";

export const PropertyControllerContext =
  React.createContext<PropertyControllerState | null>(null);

export const PropertyControllerProvider: React.FC<
  PropertyControllerProviderProps
> = (props) => {
  return (
    <PropertyControllerContext.Provider value={props.value}>
      {props.children}
    </PropertyControllerContext.Provider>
  );
};

PropertyControllerProvider.displayName = "PropertyControllerProvider";
