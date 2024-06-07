import { HassEntityState } from "../entities";

export const HVAC_MODES = [
  "auto",
  "heat_cool",
  "heat",
  "cool",
  "dry",
  "fan_only",
  "off",
] as const;

export type HvacMode = (typeof HVAC_MODES)[number];

export const CLIMATE_PRESET_NONE = "none";

export type HvacAction =
  | "off"
  | "preheating"
  | "heating"
  | "cooling"
  | "drying"
  | "idle"
  | "fan";

export interface HassClimateEntityAttributes {
  hvac_mode: HvacMode;
  hvac_modes: HvacMode[];
  hvac_action?: HvacAction;
  current_temperature: number;
  min_temp: number;
  max_temp: number;
  temperature: number;
  target_temp_step?: number;
  target_temp_high?: number;
  target_temp_low?: number;
  humidity?: number;
  current_humidity?: number;
  target_humidity_low?: number;
  target_humidity_high?: number;
  min_humidity?: number;
  max_humidity?: number;
  fan_mode?: string;
  fan_modes?: string[];
  preset_mode?: string;
  preset_modes?: string[];
  swing_mode?: string;
  swing_modes?: string[];
  aux_heat?: "on" | "off";
}

export type ClimateState = HassEntityState<HassClimateEntityAttributes>;
