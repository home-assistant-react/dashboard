import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { LocaleState } from "@home-assistant-react/types/src";

export const useLocale = () => {
  const context = React.useContext(getRegisteredContext<LocaleState>("locale"));
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
};
