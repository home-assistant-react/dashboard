import { rgbww2rgb } from "./rgbww2rgb";
import { rgbw2rgb } from "./rgbw2rgb";

/**
 * Adjusts an RGB color based on additional white value or cool/warm white values. This function can convert RGB to RGBW or RGBWW,
 * depending on the parameters provided. If only an RGB color is provided without additional parameters, it returns the original RGB color.
 *
 * @param rgb - The base RGB color represented as a tuple of three numbers [red, green, blue].
 * @param wv - Optional white value to be added for RGBW conversion.
 * @param cw - Optional cool white value for RGBWW conversion.
 * @param ww - Optional warm white value for RGBWW conversion; requires `cw` to be provided.
 * @param minKelvin - Optional minimum Kelvin value for white color temperature adjustment in RGBWW conversion.
 * @param maxKelvin - Optional maximum Kelvin value for white color temperature adjustment in RGBWW conversion.
 * @returns The adjusted RGB color as a tuple. This could be a direct RGB, RGBW, or RGBWW color, depending on input parameters.
 *
 * @example
 * // Adjust RGB to RGBW:
 * const rgbColor = [255, 100, 50];
 * const whiteValue = 120;
 * const rgbwColor = adjustRgb(rgbColor, whiteValue);
 * console.log(rgbwColor); // Outputs RGBW color
 *
 * // Adjust RGB to RGBWW:
 * const coolWhite = 80;
 * const warmWhite = 70;
 * const rgbwwColor = adjustRgb(rgbColor, undefined, coolWhite, warmWhite, 2000, 6500);
 * console.log(rgbwwColor); // Outputs RGBWW color based on cool and warm white inputs
 */
export function adjustRgb(
  rgb: [number, number, number],
  wv?: number,
  cw?: number,
  ww?: number,
  minKelvin?: number,
  maxKelvin?: number,
) {
  if (wv != null) {
    return rgbw2rgb([...rgb, wv] as [number, number, number, number]);
  }
  if (cw != null && ww !== null) {
    return rgbww2rgb(
      [...rgb, cw, ww] as [number, number, number, number, number],
      minKelvin,
      maxKelvin,
    );
  }
  return rgb;
}
