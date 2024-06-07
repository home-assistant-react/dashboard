import { PanelGetActionCallback } from "@home-assistant-react/types/src";

export const actionPanelGetLabel: PanelGetActionCallback = (entity, options) =>
  options?.panel?.options?.custom_label ||
  entity?.attributes?.friendly_name ||
  "";
