import { LightBrightness } from "@home-assistant-react/types/src";

export const lightBrightness = (brightness?: number | string) => {
  const output = Math.max(Math.min(Number(brightness), 255), 0);
  return output as LightBrightness;
};
