/**
 * Converts an RGBA color string to a hexadecimal color string.
 * This function parses an RGBA color format (e.g., "rgba(255, 165, 0, 0.5)") and converts it into hexadecimal format.
 * The conversion includes options to include the alpha (opacity) channel in the output, which is based on a scale of 0 to 255.
 * If the input string is not in a valid RGBA format, the function returns black ("#000000") as a default.
 *
 * @param rgba - The RGBA string to be converted.
 * @param includeOpacity - Boolean flag to determine if the alpha (opacity) value should be included in the hexadecimal output. Default is true.
 * @returns A hexadecimal color string. If `includeOpacity` is true, the output includes the alpha component, otherwise it is omitted.
 *
 * @example
 * // Example usage:
 * const hexColor = rgbaToHex("rgba(255, 165, 0, 0.5)");
 * console.log(hexColor); // Outputs: "#ffa50080" if includeOpacity is true, "#ffa500" if false.
 */
export function rgbaToHex(
  rgba: string,
  includeOpacity: boolean = true,
): string {
  // Extract components from the RGBA string
  const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

  if (!match) {
    return "#000000";
  }

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const opacity = parseFloat(match[4]);

  // Convert components to hex
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  const hexOpacity = includeOpacity
    ? Math.round(opacity * 255)
        .toString(16)
        .padStart(2, "0")
    : "";

  // Combine components into the hex string
  return `#${hexR}${hexG}${hexB}${hexOpacity}`;
}
