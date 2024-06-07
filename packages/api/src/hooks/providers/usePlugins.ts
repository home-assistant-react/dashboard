import { PluginsState } from "@home-assistant-react/types/src/providers/plugins-state";
import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";

export const usePlugins = () => {
  const context = React.useContext(
    getRegisteredContext<PluginsState>("plugins"),
  );
  if (!context) {
    throw new Error("usePlugins must be used within a PluginsProvider");
  }

  return context;
};
