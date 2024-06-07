import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { DashboardStateWithMethods } from "@home-assistant-react/types/src";

export const useDashboard = () => {
  const context = React.useContext(
    getRegisteredContext<DashboardStateWithMethods>("dashboard"),
  );
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
