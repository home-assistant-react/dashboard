/**
 * Adjusts the brightness of an RGB color. Optionally, the color brightness can be inverted.
 * If the provided RGB color is black ([0, 0, 0]), it will be converted to white ([255, 255, 255]).
 * Otherwise, the brightness is adjusted based on the provided `value`.
 *
 * @param rgbColor - The RGB color to adjust, represented as a tuple of three numbers [red, green, blue].
 * @param value - The brightness value to adjust to. If not provided, the color is adjusted to white if it's initially black.
 *                This should be a number between 0 (black) and 255 (white).
 * @param invert - Whether to invert the brightness adjustment. Default is false.
 *                 If true, the brightness adjustment ratio is inverted.
 * @returns The adjusted RGB color as a tuple.
 *
 * @example
 * // Example usage:
 * const originalColor = [150, 100, 200];
 * const brightenedColor = adjustColorBrightness(originalColor, 200);
 * console.log(brightenedColor); // Outputs a brightened color, for example: [204, 136, 255]
 *
 * const darkenedColor = adjustColorBrightness(originalColor, 50);
 * console.log(darkenedColor); // Outputs a darkened color, for example: [61, 41, 82]
 *
 * const invertedBrightness = adjustColorBrightness(originalColor, 100, true);
 * console.log(invertedBrightness); // Outputs an inverted brightness color, for example: [255, 170, 255]
 */
export const adjustColorBrightness = (
  rgbColor: [number, number, number],
  value?: number,
  invert = false,
) => {
  const isBlack = rgbColor.every((c) => c === 0);
  if (isBlack) {
    rgbColor[0] = 255;
    rgbColor[1] = 255;
    rgbColor[2] = 255;
  }
  if (value !== undefined && value !== 255) {
    let ratio = value / 255;
    if (invert) {
      ratio = 1 / ratio;
    }
    rgbColor[0] = Math.min(255, Math.round(rgbColor[0] * ratio));
    rgbColor[1] = Math.min(255, Math.round(rgbColor[1] * ratio));
    rgbColor[2] = Math.min(255, Math.round(rgbColor[2] * ratio));
  }
  return rgbColor;
};
