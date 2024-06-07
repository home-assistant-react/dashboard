import React from "react";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { StyleEditorState } from "@home-assistant-react/types/src";

export const useStyleEditor = () => {
  const context = React.useContext(
    getRegisteredContext<StyleEditorState>("style-editor"),
  );
  if (!context) {
    throw new Error("useStyleEditor must be used within a StyleEditorProvider");
  }

  return context;
};
