import { HassEntityState } from "@home-assistant-react/types/src";
import { IconProps } from "@mdi/react/dist/IconProps";
import React from "react";
import { getStateIconPath } from "./getStateIconPath";
import Icon from "@mdi/react";

export const getIconFromEntityState = (
  state: HassEntityState,
  options?: Partial<IconProps>,
) => {
  if (state.attributes.entity_picture) {
    return React.createElement("img", {
      src: String(state.attributes.entity_picture).startsWith("/")
        ? "https://home.jal.ovh:8123" + state.attributes.entity_picture
        : state.attributes.entity_picture,
      style: {
        width: (Number(options?.size) || 1) * 30,
        height: (Number(options?.size) || 1) * 30,
        borderRadius: "50%",
      },
    });
  }

  const iconValue = getStateIconPath(state);

  if (typeof iconValue === "string") {
    return React.createElement(Icon, {
      path: iconValue,
      ...options,
    });
  }

  return null;

  /*return getIcon(
    state.info?.icon,
    state.attributes.device_class,
    getDomainFromEntityId(state.info?.entity_id || ""),
    options,
  );*/
};
