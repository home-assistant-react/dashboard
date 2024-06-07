import { getPanelComponent } from "./get-panel-component";
import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { Panel, PanelFcCustomStyle } from "@home-assistant-react/types/src";
import { commonCustomStyles } from "@home-assistant-react/types/src/panels/common-custom-styles";

export const getPanelEditorStyles = (panel: Panel) => {
  const output: Record<string, PanelFcCustomStyle> = {};
  const panelComponent = getPanelComponent(panel.component);
  const styles = { ...commonCustomStyles, ...panelComponent?.customStyles };

  getObjectKeys(styles)?.forEach((styleName) => {
    output[styleName] = {
      ...styles[styleName],
      style: { ...styles[styleName].style, ...panel.styles?.[styleName] },
    };
  });

  return output;
};
