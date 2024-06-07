import { PanelFC } from "@home-assistant-react/types/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";

export const wastePanelGetIcon: PanelFC["getIcon"] = (_, options) =>
  getMdiIcon("recycle", options);
