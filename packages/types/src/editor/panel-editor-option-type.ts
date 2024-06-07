import { Dict } from "../common";

export enum EditorPropertyType {
  Entity = "Entity",
  Text = "Text",
  Number = "Number",
  Boolean = "Boolean",
  Color = "Color",
  Select = "Select",
  YesNo = "YesNo",
  Toggle = "Toggle",
  Direction = "Direction",
  Visibility = "Visibility",
  Header = "Header",
  Icon = "Icon",
}

export interface PanelEditorConfigBase<T extends Dict = Dict> {
  type: EditorPropertyType;
  label: string;
  name: keyof T;
  description?: string;
}

export interface PanelEditorConfigEntity<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Entity;
  domain?: string;
}

export interface PanelEditorConfigText<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Text;
}

export interface PanelEditorConfigIcon<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Icon;
}

export interface PanelEditorConfigNumber<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Number;
  min?: number;
  max?: number;
}

export interface PanelEditorConfigBoolean<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Boolean;
}

export interface PanelEditorConfigColor<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Color;
}

export interface PanelEditorConfigSelect<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Select;
  options: { label: string; value: string | number | boolean }[];
  defaultLabel?: string;
}

export interface PanelEditorConfigVisibility<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Visibility;
}

export interface PanelEditorConfigHeader<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Header;
}

export interface PanelEditorConfigDirection<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Direction;
}
export interface PanelEditorConfigYesNo<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.YesNo;
}
export interface PanelEditorConfigDirection<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Direction;
}

export interface PanelEditorConfigToggle<T extends Dict = Dict>
  extends PanelEditorConfigBase<T> {
  type: EditorPropertyType.Toggle;
}

export type PanelEditorOptionType<T extends Dict = Dict> =
  | PanelEditorConfigEntity<T>
  | PanelEditorConfigText<T>
  | PanelEditorConfigNumber<T>
  | PanelEditorConfigBoolean<T>
  | PanelEditorConfigColor<T>
  | PanelEditorConfigSelect<T>
  | PanelEditorConfigVisibility<T>
  | PanelEditorConfigHeader<T>
  | PanelEditorConfigDirection<T>
  | PanelEditorConfigIcon<T>
  | PanelEditorConfigYesNo<T>
  | PanelEditorConfigToggle<T>;
