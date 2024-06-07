import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { HassProviderState } from "@home-assistant-react/types/src";

export const useHass = () => {
  const context = React.useContext(
    getRegisteredContext<HassProviderState>("hass"),
  );
  if (!context) {
    throw new Error("useHass must be used within a HassProvider");
  }

  return context;
};
