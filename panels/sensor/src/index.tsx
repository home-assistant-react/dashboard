import { Sensor } from "./components/Sensor";
import { SensorPreviewPanel } from "./components/SensorPanelPreview";
import { sensorPanelConfigOptions } from "./defines/configuration";
import { sensorPanelCustomStyles } from "./defines/custom-styles";
import { sensorPanelGetIcon } from "./defines/get-icon";

export const SensorPanel = Sensor;

SensorPanel.previewPanel = SensorPreviewPanel;
SensorPanel.getIcon = sensorPanelGetIcon;
SensorPanel.panelInitialStyle = {
  position: "relative",
};
SensorPanel.customStyles = sensorPanelCustomStyles;
SensorPanel.defaultOptions = {
  showChart: false,
  chartHistoryInterval: 1,
  chartHistoryIntervalType: "hours",
  chartUpdateInterval: 1800,
  /*chartFillColor: "#0000FF",
  chartLineColor: "#000000",*/
};
SensorPanel.configOptions = sensorPanelConfigOptions;
