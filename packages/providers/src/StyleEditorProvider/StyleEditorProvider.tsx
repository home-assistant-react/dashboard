import React from "react";
import { StyleEditorProviderProps } from "./StyleEditorProvider.types";
import { StyleEditorState } from "@home-assistant-react/types/src";

export const StyleEditorContext = React.createContext<StyleEditorState | null>(
  null,
);

export const StyleEditorProvider: React.FC<StyleEditorProviderProps> = (
  props,
) => {
  return (
    <StyleEditorContext.Provider value={props.value}>
      {props.children}
    </StyleEditorContext.Provider>
  );
};

StyleEditorProvider.displayName = "StyleEditorProvider";
