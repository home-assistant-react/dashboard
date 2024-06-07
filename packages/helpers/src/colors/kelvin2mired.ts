/**
 * Converts a color temperature in Kelvin to Mired (micro reciprocal degree).
 * This conversion is useful for applications involving color temperature control, such as lighting systems,
 * where Mired values are often more useful than Kelvin values.
 *
 * @param kelvinTemperature - The color temperature in Kelvin to be converted to Mired.
 * @returns The corresponding Mired value, computed as the floor of one million divided by the Kelvin temperature.
 *
 * @example
 * // Example usage:
 * const miredValue = kelvin2mired(6500);
 * console.log(miredValue); // Outputs: 153 (approximate Mired value for 6500K)
 */
export const kelvin2mired = (kelvinTemperature: number) =>
  Math.floor(1000000 / kelvinTemperature);
