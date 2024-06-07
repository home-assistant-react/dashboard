import { PanelFC } from "@home-assistant-react/types/src";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";

export const climatePanelGetIcon: PanelFC["getIcon"] = (_, options) => (
  <Icon name={"Thermometer"} size={Number(options?.size) || 4} />
);
