// From HomeAssistant frontend-dev repo
import { HassEntityState } from "@home-assistant-react/types/src";
import { getBatteryIcon } from "./getBatteryIcon";

export const getBatteryStateIcon = (
  batteryState: HassEntityState,
  batteryChargingState?: HassEntityState,
) => {
  const battery = batteryState.state;
  const batteryCharging =
    batteryChargingState && batteryChargingState.state === "on";

  return getBatteryIcon(battery, batteryCharging);
};
