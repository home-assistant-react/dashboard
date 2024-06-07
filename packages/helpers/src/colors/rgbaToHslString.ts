/**
 * Converts an RGBA color string to an HSL representation.
 *
 * @param rgbaString - A string representing a color in RGBA format (e.g., "rgba(255, 0, 0, 0.5)").
 * @returns A string representing the color in HSL format without the "hsl(...)" wrapper, or an empty string if the input is invalid.
 *
 * @example
 *
 * // Returns "0 100% 50%"
 * rgbaToHslString("rgba(255, 0, 0, 1)");
 *
 * @example
 *
 * // Returns "60 100% 50%"
 * rgbaToHslString("rgba(255, 255, 0, 1)");
 *
 * @example
 *
 * // Returns "120 100% 50%"
 * rgbaToHslString("rgba(0, 255, 0, 1)");
 *
 * @example
 *
 * // Returns "240 100% 50%"
 * rgbaToHslString("rgba(0, 0, 255, 1)");
 */
export function rgbaToHslString(rgbaString: string): string {
  const rgbaMatch = rgbaString.match(
    /rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.\d+|\d*))?\)/,
  );

  if (!rgbaMatch) {
    return "";
  }

  const r = parseInt(rgbaMatch[1], 10) / 255;
  const g = parseInt(rgbaMatch[2], 10) / 255;
  const b = parseInt(rgbaMatch[3], 10) / 255;

  // Get the min and max RGB values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate lightness
  const l = (max + min) / 2;

  // Calculate saturation
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  // Calculate hue
  let h = 0;
  if (delta !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / delta + 2) * 60;
        break;
      case b:
        h = ((r - g) / delta + 4) * 60;
        break;
    }
  }

  // Return the HSL string in CSS variable format, without the "hsl(...)" wrapper
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
