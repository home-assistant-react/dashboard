import { kelvin2mired } from "./kelvin2mired";
import { mired2kelvin } from "./mired2kelvin";
import { temperature2rgb } from "./temperature2rgb";
import { matchMaxScale } from "./matchMaxScale";

const DEFAULT_MIN_KELVIN = 2700;
const DEFAULT_MAX_KELVIN = 6500;

/**
 * Converts an RGBWW (Red, Green, Blue, Cool White, Warm White) tuple into an RGB (Red, Green, Blue) tuple.
 * This function integrates the effects of cool and warm white LEDs with the RGB values, based on the calculated color temperature.
 * It automatically handles the conversion of color temperature from Kelvin to Mired and back, adjusting RGB values to simulate
 * the influence of the white LEDs under specified color temperature conditions.
 *
 * @param rgbww - The RGBWW tuple where the first three elements are Red, Green, and Blue, the fourth is Cool White, and the fifth is Warm White.
 * @param minKelvin - Optional. The minimum Kelvin value for color temperature calculation, defaults to 2700 Kelvin.
 * @param maxKelvin - Optional. The maximum Kelvin value for color temperature calculation, defaults to 6500 Kelvin.
 * @returns An RGB tuple adjusted to reflect the contribution of the white LEDs.
 *
 * @example
 * // Example usage:
 * const originalRGBWW = [100, 150, 200, 50, 100]; // An RGBWW color
 * const convertedRGB = rgbww2rgb(originalRGBWW);
 * console.log(convertedRGB); // Outputs an RGB color adjusted for the effect of white LEDs.
 */
export const rgbww2rgb = (
  rgbww: [number, number, number, number, number],
  minKelvin?: number,
  maxKelvin?: number,
): [number, number, number] => {
  const [r, g, b, cw, ww] = rgbww;
  // Calculate color temperature of the white channels
  const maxMireds: number = kelvin2mired(minKelvin ?? DEFAULT_MIN_KELVIN);
  const minMireds: number = kelvin2mired(maxKelvin ?? DEFAULT_MAX_KELVIN);
  const miredRange: number = maxMireds - minMireds;
  let ctRatio: number;
  try {
    ctRatio = ww / (cw + ww);
  } catch (_error) {
    ctRatio = 0.5;
  }
  const colorTempMired = minMireds + ctRatio * miredRange;
  const colorTempKelvin = colorTempMired ? mired2kelvin(colorTempMired) : 0;
  const [wR, wG, wB] = temperature2rgb(colorTempKelvin);
  const whiteLevel = Math.max(cw, ww) / 255;

  // Add the white channels to the rgb channels.
  const rgb = [
    r + wR * whiteLevel,
    g + wG * whiteLevel,
    b + wB * whiteLevel,
  ] as [number, number, number];

  // Match the output maximum value to the input. This ensures the
  // output doesn't overflow.
  return matchMaxScale([r, g, b, cw, ww], rgb) as [number, number, number];
};
