import { PropsWithChildren } from "react";
import { PanelEditorState } from "@home-assistant-react/types/src";

export interface PanelEditorProviderProps extends PropsWithChildren {
  value: PanelEditorState;
}
