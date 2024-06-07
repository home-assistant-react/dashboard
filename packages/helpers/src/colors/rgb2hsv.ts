/**
 * Converts a Red-Green-Blue (RGB) tuple into a Hue-Saturation-Value (HSV) tuple.
 * This function calculates the maximum RGB value as the Value, the difference between the maximum and minimum RGB values as the Chroma,
 * and uses these to derive the Hue and Saturation. Hue is calculated based on which RGB component is the max and the differences between the others,
 * ensuring proper circular mapping by adjusting for negative values.
 *
 * @param rgb - The RGB tuple where each element represents the intensity of Red, Green, and Blue respectively.
 * @returns An HSV tuple:
 *          - The first element, Hue, ranges from 0 to 360 degrees.
 *          - The second element, Saturation, is calculated as the ratio of Chroma to Value, ranging from 0 to 1.
 *          - The third element, Value, is the maximum of the RGB components, ranging from 0 to 255.
 *
 * @example
 * // Example usage:
 * const hsvColor = rgb2hsv([255, 0, 0]); // Converts RGB red to HSV
 * console.log(hsvColor); // Outputs: [0, 1, 255], representing the hue, saturation, and value of pure red.
 */
export const rgb2hsv = (
  rgb: [number, number, number],
): [number, number, number] => {
  const [r, g, b] = rgb;
  const v = Math.max(r, g, b);
  const c = v - Math.min(r, g, b);
  const h =
    c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};
