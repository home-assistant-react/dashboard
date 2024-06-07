import { PanelFC } from "@home-assistant-react/types/src";
import { Icon } from "@home-assistant-react/icons/src";
import { getCoverIcon } from "@home-assistant-react/icons/src/entities";
import { IconFromSet } from "@home-assistant-react/ui/src/components/controls/IconPicker/IconFromSet";

export const coverPanelGetIcon: PanelFC["getIcon"] = (entity, options) => {
  const icon = getCoverIcon(entity?.state, entity, options?.panel?.options);
  if (typeof icon === "string") {
    return <Icon path={icon} size={options?.size || "16px"} />;
  }
  return <IconFromSet icon={icon} />;
};
