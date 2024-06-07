import { PanelFC } from "@home-assistant-react/types/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";

export const getSlideshowIcon: PanelFC["getIcon"] = (_, options) =>
  getMdiIcon("imageMultipleOutline", options);
