import { HvacMode } from "@home-assistant-react/types/src/home-assistant/entities-state/climate";
import { IconValue } from "@home-assistant-react/ui/src";

export const CLIMATE_HVAC_MODE_ICONS: Record<HvacMode, IconValue> = {
  cool: { set: "mdi", icon: "mdiSnowflake" },
  dry: { set: "mdi", icon: "mdiWaterPercent" },
  fan_only: { set: "mdi", icon: "mdiFan" },
  auto: { set: "mdi", icon: "mdiThermostatAuto" },
  heat: { set: "mdi", icon: "mdiFire" },
  off: { set: "mdi", icon: "mdiPower" },
  heat_cool: { set: "mdi", icon: "mdiSunSnowflakeVariant" },
} as const;

export const getClimateHvacModeIcon = (mode: HvacMode | string) =>
  mode in CLIMATE_HVAC_MODE_ICONS
    ? CLIMATE_HVAC_MODE_ICONS[mode as HvacMode]
    : { set: "mdi", icon: "mdiThermostat" };
