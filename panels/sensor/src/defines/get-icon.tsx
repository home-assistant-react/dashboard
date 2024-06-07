import { getIconFromEntityState } from "@home-assistant-react/icons/src";
import { PanelFC } from "@home-assistant-react/types/src";

export const sensorPanelGetIcon: PanelFC["getIcon"] = (entity, options) =>
  entity ? getIconFromEntityState(entity, { size: options?.size }) : undefined;
