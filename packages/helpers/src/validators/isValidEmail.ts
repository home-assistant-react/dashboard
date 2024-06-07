/**
 * Validates if a given string is a valid email address.
 *
 * @param value - The string to be checked for a valid email format.
 * @returns A boolean indicating whether the input string is a valid email address (true) or not (false).
 *
 * @example
 * // Example usage:
 * console.log(isValidEmail("example@example.com")); // Outputs: true
 * console.log(isValidEmail("invalid-email")); // Outputs: false
 * console.log(isValidEmail("another.example@domain.co")); // Outputs: true
 */
export function isValidEmail(value: string): boolean {
  return /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(value);
}
