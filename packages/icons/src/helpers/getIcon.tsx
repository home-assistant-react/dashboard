import { IconProps } from "@mdi/react/dist/IconProps";
import { capitalize } from "@home-assistant-react/helpers/src";
import Icon from "@mdi/react";
import * as MdiIcons from "@mdi/js";
import {
  DEFAULT_DOMAIN_ICON,
  FIXED_DEVICE_CLASS_ICONS,
  FIXED_DOMAIN_ICONS,
  mdiMatchPattern,
} from "../defines";
export function getIcon(
  icon?: string | null,
  deviceClass?: string | null,
  domain?: string,
  options?: Partial<IconProps>,
) {
  let mdiPath: string | undefined = "";
  if (icon && icon.match(mdiMatchPattern)) {
    const iconName = "mdi" + capitalize(icon.replace(mdiMatchPattern, ""));
    const selectedIcon = MdiIcons[iconName as keyof typeof MdiIcons];
    if (selectedIcon) {
      mdiPath = selectedIcon;
    }
  } else if (deviceClass) {
    mdiPath = FIXED_DEVICE_CLASS_ICONS[deviceClass as never];
  } else if (domain) {
    mdiPath = FIXED_DOMAIN_ICONS[domain as never];
  }

  if (!mdiPath) mdiPath = DEFAULT_DOMAIN_ICON;

  if (mdiPath) return <Icon path={mdiPath} size={1} {...options} />;

  return null;
}
