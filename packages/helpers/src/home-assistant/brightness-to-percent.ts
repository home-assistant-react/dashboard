import { lightBrightness } from "./light-brightness";

export const brightnessToPercent = (brightness?: number | string) => {
  return parseInt(String((lightBrightness(brightness) / 255) * 100));
};
