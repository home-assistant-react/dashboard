import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";
import { WasteDryIcon } from "./icons/WasteDryIcon";
import { WasteWetIcon } from "./icons/WasteWetIcon";
import { WastePaperIcon } from "./icons/WastePaperIcon";
import { WasteBottleIcon } from "./icons/WasteBottleIcon";

export const UPDATE_TIME = 30 * 60 * 1000;

export const wasteInfo = {
  [WasteType.Empty]: {
    background: undefined,
    color: undefined,
    icon: undefined,
    name: "",
  },
  [WasteType.None]: {
    background: undefined,
    color: undefined,
    icon: undefined,
    name: "",
  },
  [WasteType.NoService]: {
    background: undefined,
    color: undefined,
    icon: undefined,
    name: "",
  },
  [WasteType.Dry]: {
    background:
      "linear-gradient(158deg, rgba(181,181,181,1) 0%, rgba(93,93,93,1) 100%)",
    color: "#fff",
    icon: WasteDryIcon,
    name: "Dry",
  },
  [WasteType.Wet]: {
    background:
      "linear-gradient(158deg, rgba(135,110,83,1) 0%, rgba(121,105,66,1) 100%)",
    color: "#fff",
    icon: WasteWetIcon,
    name: "Wet",
  },
  [WasteType.Paper]: {
    background:
      "linear-gradient(158deg, rgba(83,95,135,1) 0%, rgba(66,68,121,1) 100%)",
    color: "#fff",
    icon: WastePaperIcon,
    name: "Paper",
  },
  [WasteType.Plastic]: {
    background:
      "linear-gradient(158deg, rgba(221,226,141,1) 0%, rgba(224,177,114,1) 100%)",
    color: "#646206",
    icon: WasteBottleIcon,
    name: "Plastic",
  },
};

export const wasteValues = [
  { label: "Dry", value: WasteType.Dry },
  { label: "Wet", value: WasteType.Wet },
  { label: "Plastic", value: WasteType.Plastic },
  { label: "Paper", value: WasteType.Paper },
  { label: "Glass", value: WasteType.Glass },
  { label: "No service", value: WasteType.NoService },
  { label: "None", value: WasteType.None },
];
