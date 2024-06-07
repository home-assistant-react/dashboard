/**
 * Converts a decimal number to a two-character hexadecimal string.
 * This function converts a given decimal integer to its hexadecimal representation.
 * If the resulting hexadecimal string is a single character, it prefixes it with '0' to ensure two characters are always returned.
 *
 * @param decimal - The decimal number to convert to hexadecimal. The number should be in the range 0 to 255.
 * @returns A two-character hexadecimal string representing the input decimal.
 *
 * @example
 * // Example usage:
 * const hexValue = decimalToHex(10);
 * console.log(hexValue); // Outputs: "0a"
 *
 * const hexValue2 = decimalToHex(255);
 * console.log(hexValue2); // Outputs: "ff"
 */
function decimalToHex(decimal: number) {
  const hex = decimal.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

/**
 * Converts RGB color values to a hexadecimal color string.
 * This function takes red, green, and blue color components as inputs, converts each to a hexadecimal string using `decimalToHex`,
 * and concatenates them into a single hexadecimal color code prefixed with '#'.
 *
 * @param r - The red component of the color, should be in the range 0-255.
 * @param g - The green component of the color, should be in the range 0-255.
 * @param b - The blue component of the color, should be in the range 0-255.
 * @returns A string representing the color in hexadecimal format.
 *
 * @example
 * // Example usage:
 * const hexColor = rgbToHex(255, 165, 0); // Converts RGB orange to hex
 * console.log(hexColor); // Outputs: "#ffa500"
 */
export function rgbToHex(r: number, g: number, b: number) {
  return "#" + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
}
