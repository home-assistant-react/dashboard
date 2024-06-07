import { Waste } from "./Waste";
import { wastePanelConfiguration } from "./configuration";
import { wastePanelCustomStyles } from "./custom-styles";
import { wastePanelGetIcon } from "./get-icon";

const WastePanel = Waste;

WastePanel.configOptions = wastePanelConfiguration;
WastePanel.customStyles = wastePanelCustomStyles;
WastePanel.getIcon = wastePanelGetIcon;

export { WastePanel };
