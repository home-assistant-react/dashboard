/**
 * Checks if a given value is a valid number.
 *
 * @param value - The value to be checked, which can be either a string or a number.
 * @returns A boolean indicating whether the input value is a valid number (true) or not (false).
 *
 * @example
 * // Example usage:
 * console.log(isValidNumber("123")); // Outputs: true
 * console.log(isValidNumber("123abc")); // Outputs: false
 * console.log(isValidNumber(456)); // Outputs: true
 * console.log(isValidNumber(NaN)); // Outputs: false
 */
export const isValidNumber = (value: string | number): boolean => {
  return !isNaN(Number(value));
};
