import { hsv2rgb } from "./hsv2rgb";

/**
 * Converts a Hue-Saturation (HS) tuple into a Red-Green-Blue (RGB) tuple, assuming maximum value for brightness.
 * This function wraps a conversion from HS to RGB by setting the Value component to its maximum (255) in HSV color space,
 * effectively treating the input as full brightness.
 *
 * @param hs - The Hue-Saturation tuple, where:
 *             - The first element is the Hue (0 to 360 degrees),
 *             - The second element is the Saturation (0 to 100%).
 * @returns An RGB tuple where each element represents the Red, Green, and Blue components of the color.
 *
 * @example
 * // Example usage:
 * const rgbColor = hs2rgb([180, 50]); // Outputs: [63, 191, 191]
 * console.log(rgbColor); // Prints the RGB representation of a half-saturated sky blue at full brightness.
 */
export const hs2rgb = (hs: [number, number]): [number, number, number] =>
  hsv2rgb([hs[0], hs[1], 255]);
