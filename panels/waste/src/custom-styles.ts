import { CustomStyles } from "@home-assistant-react/types/src";
import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";

export const wastePanelCustomStyles: CustomStyles = {
  /*[WasteType.Empty]: {
    title: "waste_empty_title",
  },*/
  [WasteType.None]: {
    title: "None",
  },
  [WasteType.NoService]: {
    title: "No service",
  },
  [WasteType.Dry]: {
    title: "Dry",
  },
  [WasteType.Wet]: {
    title: "Wet",
  },
  [WasteType.Paper]: {
    title: "Paper",
  },
  [WasteType.Plastic]: {
    title: "Plastic",
  },
  [WasteType.Glass]: {
    title: "Glass",
  },
};
