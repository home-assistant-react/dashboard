import { PanelFcStyleProperties } from "../panels";

export interface StyleEditorState {
  selectedStyleKey?: string;
  style?: PanelFcStyleProperties;
  updateStyle: <
    T extends keyof PanelFcStyleProperties = keyof PanelFcStyleProperties,
  >(
    styleProp: T,
    styleValue: PanelFcStyleProperties[T],
  ) => void;
}
