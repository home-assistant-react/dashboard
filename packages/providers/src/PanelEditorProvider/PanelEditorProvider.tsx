import React from "react";
import { PanelEditorProviderProps } from "./PanelEditorProvider.types";
import { PanelEditorState } from "@home-assistant-react/types/src";

export const PanelEditorContext = React.createContext<PanelEditorState | null>(
  null,
);

export const PanelEditorProvider: React.FC<PanelEditorProviderProps> = ({
  children,
  value,
}) => {
  return (
    <PanelEditorContext.Provider value={value}>
      {children}
    </PanelEditorContext.Provider>
  );
};

PanelEditorProvider.displayName = "PanelEditorProvider";
