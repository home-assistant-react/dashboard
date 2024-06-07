import { rgb2hsv } from "./rgb2hsv";

/**
 * Converts a Red-Green-Blue (RGB) tuple into a Hue-Saturation (HS) tuple, omitting the Value component used in HSV.
 * This function utilizes an RGB to HSV conversion and then extracts the Hue and Saturation components,
 * providing a simplified color descriptor focusing on color tone and intensity without brightness.
 *
 * @param rgb - The RGB tuple where each element represents the intensity of Red, Green, and Blue respectively.
 * @returns An HS tuple:
 *          - The first element is the Hue (0 to 360 degrees),
 *          - The second element is the Saturation (0 to 100%).
 *
 * @example
 * // Example usage:
 * const hsColor = rgb2hs([255, 0, 0]); // Converts RGB red to HS
 * console.log(hsColor); // Outputs: [0, 100], representing the hue and saturation of pure red.
 */
export const rgb2hs = (rgb: [number, number, number]): [number, number] =>
  rgb2hsv(rgb).slice(0, 2) as [number, number];
