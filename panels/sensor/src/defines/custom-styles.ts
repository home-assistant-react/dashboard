import { CustomStyles } from "@home-assistant-react/types/src";
import { StyleEditorCategory } from "@home-assistant-react/types/src/style-editor";

export const sensorPanelCustomStyles: CustomStyles = {
  chart: {
    title: "Chart",
    enabledCategories: [StyleEditorCategory.FillAndStroke],
  },
};
