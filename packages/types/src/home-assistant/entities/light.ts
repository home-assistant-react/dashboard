export const enum LightColorMode {
  UNKNOWN = "unknown",
  ONOFF = "onoff",
  BRIGHTNESS = "brightness",
  COLOR_TEMP = "color_temp",
  HS = "hs",
  XY = "xy",
  RGB = "rgb",
  RGBW = "rgbw",
  RGBWW = "rgbww",
  WHITE = "white",
}

export const enum LightEntityFeature {
  EFFECT = 4,
  FLASH = 8,
  TRANSITION = 32,
}

export type LightColor =
  | {
      color_temp_kelvin: number;
    }
  | {
      hs_color: [number, number];
    }
  | {
      rgb_color: [number, number, number];
    }
  | {
      rgbw_color: [number, number, number, number];
    }
  | {
      rgbww_color: [number, number, number, number, number];
    };
