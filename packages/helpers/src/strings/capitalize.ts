/**
 * Capitalizes the first letter of a given string.
 * This function converts the first character of the input string to uppercase,
 * leaving the rest of the string unchanged.
 *
 * @param txt - The string to be capitalized.
 * @returns A new string with the first letter capitalized.
 *
 * @example
 * // Example usage:
 * const result = capitalize("hello");
 * console.log(result); // Outputs: "Hello"
 */
export function capitalize(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}
