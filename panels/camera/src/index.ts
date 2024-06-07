import { Camera } from "./components/Camera";
import { CameraPreviewPanel } from "./components/CameraPreviewPanel";
import { cameraPanelConfigOptions } from "./defines/configuration";
import { cameraPanelCustomStyles } from "./defines/custom-styles";
import { cameraPanelGetIcon } from "./defines/get-icon";
import { cameraPanelGetLabel } from "./defines/get-label";

const CameraPanel = Camera;
CameraPanel.getIcon = cameraPanelGetIcon;
CameraPanel.getLabel = cameraPanelGetLabel;
CameraPanel.configOptions = cameraPanelConfigOptions;
CameraPanel.customStyles = cameraPanelCustomStyles;
CameraPanel.previewPanel = CameraPreviewPanel;
CameraPanel.suitableForDomains = ["camera"];

CameraPanel.defaultOptions = {};

export { CameraPanel };
