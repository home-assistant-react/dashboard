import { PanelFC } from "@home-assistant-react/types/src";

export const lightPanelGetLabel: PanelFC["getLabel"] = (entity, options) =>
  options?.panel?.options?.custom_name ||
  entity?.attributes?.friendly_name ||
  "";
