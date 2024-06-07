// Original from HomeAssistant frontend-dev repo
import {
  HassEntityState,
  SensorDeviceClass,
  TEMPERATURE_UNIT_C,
  TEMPERATURE_UNIT_F,
} from "@home-assistant-react/types/src";
import { FIXED_DEVICE_CLASS_ICONS } from "../defines";
import { getBatteryStateIcon } from "./getBatteryStateIcon";
import { mdiBattery, mdiThermometer } from "@mdi/js";

export const getSensorIcon = (
  stateObj?: HassEntityState,
): string | undefined => {
  const deviceClassName = stateObj?.attributes.device_class;

  if (deviceClassName && deviceClassName in FIXED_DEVICE_CLASS_ICONS) {
    return FIXED_DEVICE_CLASS_ICONS[
      deviceClassName as keyof typeof FIXED_DEVICE_CLASS_ICONS
    ];
  }

  if (deviceClassName === SensorDeviceClass.Battery) {
    return stateObj ? getBatteryStateIcon(stateObj) : mdiBattery;
  }

  const unit = stateObj?.attributes.unit_of_measurement;
  if (unit === TEMPERATURE_UNIT_C || unit === TEMPERATURE_UNIT_F) {
    return mdiThermometer;
  }

  return undefined;
};
