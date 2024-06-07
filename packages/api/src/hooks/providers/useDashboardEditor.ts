import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { DashboardEditorState } from "@home-assistant-react/types/src";
export const useDashboardEditor = () => {
  const context = React.useContext(
    getRegisteredContext<DashboardEditorState>("dashboard-editor"),
  );
  if (!context) {
    throw new Error(
      "useDashboardEditor must be used within a DashboardEditorProvider",
    );
  }

  return context;
};
