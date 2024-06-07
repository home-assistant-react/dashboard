import { Climate } from "./components/Climate";
import { ClimatePreviewPanel } from "./components/ClimatePreviewPanel";
import { climatePanelConfigOptions } from "./defines/configuration";
import { climatePanelCustomStyles } from "./defines/custom-styles";
import { climatePanelGetIcon } from "./defines/get-icon";
import { climatePanelGetLabel } from "./defines/get-label";

const ClimatePanel = Climate;
ClimatePanel.getIcon = climatePanelGetIcon;
ClimatePanel.getLabel = climatePanelGetLabel;
ClimatePanel.configOptions = climatePanelConfigOptions;
ClimatePanel.customStyles = climatePanelCustomStyles;
ClimatePanel.enabledContextMenu = false;
ClimatePanel.previewPanel = ClimatePreviewPanel;
ClimatePanel.suitableForDomains = ["climate"];

ClimatePanel.defaultOptions = {};

export { ClimatePanel };
