import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { PanelEditorState } from "@home-assistant-react/types/src";

export const usePanelEditor = () => {
  return React.useContext(
    getRegisteredContext<PanelEditorState>("panel-editor"),
  );
};
