import { StyleEditorState } from "@home-assistant-react/types/src";
import { PropsWithChildren } from "react";

export interface StyleEditorProviderProps extends PropsWithChildren {
  value: StyleEditorState;
}
