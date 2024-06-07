import { snakeToCamel } from "@home-assistant-react/helpers/src/strings/snakeToCamel";
import {
  getIconFromEntityState,
  getMdiIcon,
} from "@home-assistant-react/icons/src";
import { PanelGetIconCallback } from "@home-assistant-react/types/src";
import { IconFromSet } from "@home-assistant-react/ui/src/components/controls/IconPicker/IconFromSet";

export const actionPanelGetIcon: PanelGetIconCallback = (entity, options) => {
  if (options?.panel?.options.custom_icon) {
    return (
      <IconFromSet
        icon={options.panel.options.custom_icon}
        size={options?.size ? Number(options?.size) : undefined}
      />
    );
  }
  if (entity?.attributes?.icon) {
    return getMdiIcon(
      snakeToCamel(String(entity.attributes.icon).replace("mdi:", "")),
      options,
    );
  }

  return entity
    ? getIconFromEntityState(entity, { size: options?.size })
    : undefined;
};
