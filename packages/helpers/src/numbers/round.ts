/**
 * Rounds a number to a specified precision.
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to (default is 2).
 * @returns The rounded number.
 *
 * @example
 * // Example usage:
 * const roundedValue = round(3.14159, 2);
 * console.log(roundedValue); // Outputs: 3.14
 */
export const round = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision;
