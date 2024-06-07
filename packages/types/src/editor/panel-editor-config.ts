import { PanelEditorOptionType } from "./panel-editor-option-type";
import { ReactElement } from "react";
import { Dict } from "../common";

export interface PanelEditorConfigGroup<T extends Dict = Dict> {
  title: string;
  options?: PanelEditorOptionType<T>[];
  component?: () => ReactElement;
}
export interface PanelEditorConfig<T extends Dict = Dict> {
  customOptions?: PanelEditorConfigGroup<T>[];
}
