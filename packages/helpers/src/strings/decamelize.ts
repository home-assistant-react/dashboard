/**
 * Converts a camelCase string into a lower case string with a specified separator.
 * This function replaces transitions from lower to upper case letters with the specified separator,
 * and converts the entire string to lower case.
 *
 * @param str - The camelCase string to be converted.
 * @param separator - The separator to use between words. Default is "_".
 * @returns A new string where camelCase transitions are replaced with the separator and all characters are lower case.
 *
 * @example
 * // Example usage:
 * const result = decamelize("camelCaseString");
 * console.log(result); // Outputs: "camel_case_string"
 *
 * const resultWithDash = decamelize("camelCaseString", "-");
 * console.log(resultWithDash); // Outputs: "camel-case-string"
 */
export const decamelize = (str: string, separator = "_") => {
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
    .toLowerCase();
};
