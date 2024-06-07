import { getPanelComponent } from "./get-panel-component";
import { PanelEditorConfig } from "@home-assistant-react/types/src";

export const getPanelEditorConfig = (
  panelId: string,
): PanelEditorConfig | undefined => {
  return getPanelComponent(panelId)?.configOptions;
};
