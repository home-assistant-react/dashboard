import { StyleEditorCategory } from "@home-assistant-react/types/src/style-editor";
import React from "react";
import { StyleEditorState } from "@home-assistant-react/types/src";

export interface StyleEditorProps {
  style?: React.CSSProperties;
  onPropertyChange: StyleEditorState["updateStyle"];
  styleKey?: string;
  hasSelfScrollContainer?: boolean;
  enabledCategories?: StyleEditorCategory[];
}
