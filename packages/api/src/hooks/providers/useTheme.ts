import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { ThemeState } from "@home-assistant-react/types/src/providers/theme-state";

export const useTheme = () => {
  const context = React.useContext(getRegisteredContext<ThemeState>("theme"));
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
