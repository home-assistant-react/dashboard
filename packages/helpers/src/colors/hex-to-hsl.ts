/**
 * Converts a hexadecimal color code to an HSL (Hue, Saturation, Lightness) tuple.
 * If the input is not a valid hex color code, the function defaults to returning a base HSL value of [0, 100, 50].
 *
 * @param hex - The hexadecimal color code to be converted into HSL format.
 * @returns An HSL tuple where:
 *          - The first element is the Hue (0 to 360 degrees),
 *          - The second element is the Saturation (0 to 100%),
 *          - The third element is the Lightness (0 to 100%).
 * This represents the color in HSL format.
 *
 * @example
 * // Example usage:
 * const hslColor = hexToHsl("#00ff00"); // Outputs: [120, 100, 50]
 * console.log(hslColor); // Prints the HSL representation of bright green.
 */
export function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 100, 50];

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h ?? 0;
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}
