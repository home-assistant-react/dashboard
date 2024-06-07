import { PanelFC } from "@home-assistant-react/types/src";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";

export const cameraPanelGetIcon: PanelFC["getIcon"] = (_, options) => (
  <Icon name={"Video"} size={Number(options?.size) || 4} />
);
