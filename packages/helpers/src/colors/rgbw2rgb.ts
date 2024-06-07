import { matchMaxScale } from "./matchMaxScale";

/**
 * Converts an RGBW (Red, Green, Blue, White) tuple into an RGB (Red, Green, Blue) tuple.
 * This function adds the white component to each RGB component and then scales the new RGB values
 * to match the maximum scale of the original RGBW values to ensure the color intensity stays within valid RGB limits.
 *
 * @param rgbw - The RGBW tuple where the first three elements are Red, Green, and Blue, and the fourth element is White.
 * @returns An RGB tuple scaled appropriately based on the original RGBW values.
 *
 * @example
 * // Example usage:
 * const originalRGBW = [100, 150, 200, 50]; // An RGBW color
 * const convertedRGB = rgbw2rgb(originalRGBW);
 * console.log(convertedRGB); // Outputs an RGB color, e.g., [150, 200, 250] scaled to fit within RGB boundaries.
 */
export const rgbw2rgb = (
  rgbw: [number, number, number, number],
): [number, number, number] => {
  const [r, g, b, w] = rgbw;
  const rgb = [r + w, g + w, b + w] as [number, number, number];
  return matchMaxScale([r, g, b, w], rgb) as [number, number, number];
};
