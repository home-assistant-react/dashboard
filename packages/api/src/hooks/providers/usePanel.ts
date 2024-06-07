import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { PanelState } from "@home-assistant-react/types/src";

export const usePanel = () => {
  const context = React.useContext(getRegisteredContext<PanelState>("panel"));
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }

  return context;
};
