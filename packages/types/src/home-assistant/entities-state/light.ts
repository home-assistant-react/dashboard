import { HassEntityState, LightColorMode } from "../entities";
import { NumberRange } from "../../common";

export type LightBrightness = NumberRange<0, 255>;
export type LightRgbColor = [number, number, number];

export enum SupportedColorMode {
  ColorTemp = "color_temp",
  Brightness = "brightness",
  XY = "xy",
}

export interface HassLightEntityAttributes {
  dynamics?: string;
  effect_list?: string[];
  brightness?: number;
  supported_features?: number;
  supported_color_modes?: LightColorMode[];
  max_color_temp_kelvin?: number;
  min_color_temp_kelvin?: number;
  max_mireds?: number;
  min_mireds?: number;
  mode?: LightColorMode;
  xy_color?: [number, number];
  rgb_color?: [number, number, number];
  hs_color?: [number, number];
}

export type LightState = HassEntityState<HassLightEntityAttributes>;
