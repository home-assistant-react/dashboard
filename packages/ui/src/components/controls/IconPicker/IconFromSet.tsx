import { Icon as MdiIcon } from "@home-assistant-react/icons/src";
import * as mdiIcons from "@mdi/js";
import React from "react";
import { Icon } from "../../../primitives/Icon";
import { CustomIcon } from "../../../primitives/Icon/CustomIcon";
import { IconName } from "../../../primitives/Icon/Icon.types";
import { IconValue } from "./IconPicker.types";

export const IconFromSet: React.FC<{
  icon: IconValue;
  size?: number;
}> = ({ icon, size = 8 }) => {
  const { icon: iconName, set } = icon;
  if (set === "mdi")
    return <MdiIcon path={mdiIcons[iconName]} size={size / 5} />;
  if (set === "lucide") return <Icon name={iconName as IconName} size={size} />;
  if (set === "custom") return <CustomIcon id={iconName} size={size * 4} />;
  return null;
};
