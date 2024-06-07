import { coverPanelConfigOptions } from "./configuration";
import { Cover } from "./Cover";
import { coverPanelCustomStyles } from "./custom-styles";
import { coverPanelGetLabel } from "./get-label";
import { coverPanelGetIcon } from "./get-icon";
import { CoverPreviewPanel } from "./CoverPreviewPanel";

const CoverPanel = Cover;
CoverPanel.customStyles = coverPanelCustomStyles;
CoverPanel.configOptions = coverPanelConfigOptions;
CoverPanel.getLabel = coverPanelGetLabel;
CoverPanel.getIcon = coverPanelGetIcon;
CoverPanel.previewPanel = CoverPreviewPanel;
CoverPanel.suitableForDomains = ["cover"];

export { CoverPanel };
