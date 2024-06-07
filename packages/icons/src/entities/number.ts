/** Return an icon representing a number state. */
import { FIXED_DEVICE_CLASS_ICONS } from "../defines";
import { HassEntityState } from "@home-assistant-react/types/src";

export const getNumberIcon = (
  stateObj?: HassEntityState,
): string | undefined => {
  const deviceClassName = stateObj?.attributes.device_class;

  if (deviceClassName && deviceClassName in FIXED_DEVICE_CLASS_ICONS) {
    return FIXED_DEVICE_CLASS_ICONS[
      deviceClassName as keyof typeof FIXED_DEVICE_CLASS_ICONS
    ];
  }

  return undefined;
};
