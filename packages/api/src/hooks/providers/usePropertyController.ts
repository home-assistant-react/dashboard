import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { PropertyControllerState } from "@home-assistant-react/types/src";

export const usePropertyController = () => {
  const context = React.useContext(
    getRegisteredContext<PropertyControllerState>("property-controller"),
  );
  if (!context) {
    throw new Error(
      "usePropertyController must be used within a PropertyControllerProvider",
    );
  }

  return context;
};
