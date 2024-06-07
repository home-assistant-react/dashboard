import { PanelFC } from "@home-assistant-react/types/src";

export const coverPanelGetLabel: PanelFC["getLabel"] = (entity, options) =>
  options?.panel?.options?.custom_name ||
  entity?.attributes?.friendly_name ||
  "";
