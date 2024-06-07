/**
 * Converts a hexadecimal color code to an RGBA (Red, Green, Blue, Alpha) string.
 * The function allows specifying the opacity of the color, with a default value of 1 (fully opaque).
 * If the input hex does not start with a '#', it is adjusted internally to ensure correct processing.
 *
 * @param hex - The hexadecimal color code to be converted into RGBA format. It may start with '#' which will be removed internally.
 * @param opacity - Optional. The opacity value of the color in the resulting RGBA string. Default is 1.
 * @returns A string representing the color in RGBA format, incorporating the specified opacity.
 *
 * @example
 * // Example usage:
 * const rgbaColor = hexToRgba("#ff5733");
 * console.log(rgbaColor); // Outputs: 'rgba(255, 87, 51, 1)'
 *
 * const semiTransparentRgba = hexToRgba("#ff5733", 0.5);
 * console.log(semiTransparentRgba); // Outputs: 'rgba(255, 87, 51, 0.5)'
 */
export function hexToRgba(hex: string, opacity = 1): string {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
