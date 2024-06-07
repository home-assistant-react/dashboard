import { Action } from "./components/Action";
import { ActionPreviewPanel } from "./components/ActionPreviewPanel";
import { actionPanelConfigOptions } from "./defines/configuration";
import { actionPanelCustomStyles } from "./defines/custom-styles";
import { actionPanelGetIcon } from "./defines/get-icon";
import { actionPanelGetLabel } from "./defines/get-label";

const ActionPanel = Action;
ActionPanel.getIcon = actionPanelGetIcon;
ActionPanel.getLabel = actionPanelGetLabel;
ActionPanel.configOptions = actionPanelConfigOptions;
ActionPanel.customStyles = actionPanelCustomStyles;
ActionPanel.isPushButton = true;
ActionPanel.previewPanel = ActionPreviewPanel;
ActionPanel.suitableForDomains = ["script"];

ActionPanel.defaultOptions = {};

export { ActionPanel };
