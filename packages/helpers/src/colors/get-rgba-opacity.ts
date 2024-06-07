/**
 * Extracts the opacity value from a CSS RGBA color string.
 * If the string is a valid RGBA format and includes an opacity value, that value is extracted and returned.
 * If the string does not include an opacity value or does not match the RGBA format, the default opacity returned is `1`.
 *
 * @param rgbaString - The RGBA string from which to extract the opacity. Expected format: "rgba(r, g, b, opacity)".
 * @returns The extracted opacity as a number. Returns `1` if the opacity is not specified or if the input is not a valid RGBA string.
 *
 * @example
 * // Example usage:
 * const opacityFromValidRgba = extractOpacityFromRGBA("rgba(255, 255, 255, 0.5)");
 * console.log(opacityFromValidRgba); // Outputs: 0.5
 *
 * const opacityFromInvalidRgba = extractOpacityFromRGBA("rgb(255, 255, 255)");
 * console.log(opacityFromInvalidRgba); // Outputs: 1
 */
export function extractOpacityFromRGBA(rgbaString: string) {
  const match = rgbaString.match(
    /rgba?\(\s*(\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([0-9.]+))\s*\)/i,
  );

  if (match && match.length >= 3) {
    return parseFloat(match[2]);
  }

  return 1;
}
