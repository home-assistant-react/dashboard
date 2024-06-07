// Original from HomeAssistant frontend-dev repo
import {
  mdiBattery,
  mdiBatteryAlert,
  mdiBatteryAlertVariantOutline,
  mdiBatteryChargingOutline,
  mdiBatteryUnknown,
} from "@mdi/js";
import {
  DEFAULT_BATTERY_CHARGING_ICONS,
  DEFAULT_BATTERY_ICONS,
} from "../entities";

export const getBatteryIcon = (
  batteryState: number | string,
  batteryCharging?: boolean,
) => {
  const batteryValue = Number(batteryState);
  if (isNaN(batteryValue)) {
    if (batteryState === "off") {
      return mdiBattery;
    }
    if (batteryState === "on") {
      return mdiBatteryAlert;
    }
    return mdiBatteryUnknown;
  }

  const batteryRound = Math.round(batteryValue / 10) * 10;
  if (batteryCharging && batteryValue >= 10) {
    return DEFAULT_BATTERY_CHARGING_ICONS[
      batteryRound as keyof typeof DEFAULT_BATTERY_CHARGING_ICONS
    ];
  }
  if (batteryCharging) {
    return mdiBatteryChargingOutline;
  }
  if (batteryValue <= 5) {
    return mdiBatteryAlertVariantOutline;
  }
  return DEFAULT_BATTERY_ICONS[
    batteryRound as keyof typeof DEFAULT_BATTERY_ICONS
  ];
};
