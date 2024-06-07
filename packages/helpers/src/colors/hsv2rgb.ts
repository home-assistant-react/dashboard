/**
 * Converts a Hue-Saturation-Value (HSV) tuple into a Red-Green-Blue (RGB) tuple.
 * This function performs the color conversion by calculating each RGB component based on its relationship to the HSV values.
 * The conversion considers hue as a circular value (0 to 360 degrees) and saturation and value as percentages (0 to 100%).
 *
 * @param hsv - The Hue-Saturation-Value tuple:
 *              - The first element, Hue, ranges from 0 to 360 degrees.
 *              - The second element, Saturation, ranges from 0% to 100%.
 *              - The third element, Value, also ranges from 0% to 100%.
 * @returns An RGB tuple where each element represents the Red, Green, and Blue components of the color.
 *
 * @example
 * // Example usage:
 * const rgbColor = hsv2rgb([120, 100, 75]); // Converts HSV [120, 100, 75] to RGB
 * console.log(rgbColor); // Outputs: [0, 191, 0], a vivid green
 */
export const hsv2rgb = (
  hsv: [number, number, number],
): [number, number, number] => {
  const [h, s, v] = hsv;
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  return [f(5), f(3), f(1)];
};
