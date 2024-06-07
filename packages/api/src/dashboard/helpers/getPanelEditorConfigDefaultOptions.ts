import { getPanelComponent } from "./get-panel-component";
import { PanelEditorConfig } from "@home-assistant-react/types/src";

export const getPanelEditorConfigDefaultOptions = (
  panelId: string,
): PanelEditorConfig | undefined => {
  return getPanelComponent(panelId)?.defaultOptions;
};
