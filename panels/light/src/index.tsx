import { Light } from "./components/Light";
import { lightPanelConfigOptions } from "./defines/configuration";
import { lightPanelGetIcon } from "./defines/get-icon";
import { lightPanelCustomStyles } from "./defines/custom-styles";
import { LightPreviewPanel } from "./components/LightPreviewPanel";
import { lightPanelGetLabel } from "./defines/get-label";

const LightPanel = Light;
LightPanel.getIcon = lightPanelGetIcon;
LightPanel.getLabel = lightPanelGetLabel;
LightPanel.configOptions = lightPanelConfigOptions;
LightPanel.customStyles = lightPanelCustomStyles;
LightPanel.previewPanel = LightPreviewPanel;
LightPanel.isPushButton = (options) => !options.panel?.options?.sliderOnPanel;
LightPanel.suitableForDomains = ["light"];

LightPanel.defaultOptions = {
  showToggle: true,
  showStatus: true,
  sliderOnPanel: false,
};

export { LightPanel };
