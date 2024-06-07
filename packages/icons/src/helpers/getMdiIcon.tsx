import * as MdiIcons from "@mdi/js";
import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import { capitalize } from "@home-assistant-react/helpers/src";
import { mdiMatchPattern } from "../defines";

export function getMdiIcon(icon: string, options?: Partial<IconProps>) {
  const iconName = "mdi" + capitalize(icon.replace(mdiMatchPattern, ""));
  const selectedIcon = MdiIcons[iconName as keyof typeof MdiIcons];
  return <Icon path={selectedIcon} size={1} {...options} />;
}
