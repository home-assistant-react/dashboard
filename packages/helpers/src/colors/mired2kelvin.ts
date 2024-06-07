/**
 * Converts a color temperature in Mired (micro reciprocal degree) to Kelvin.
 * This function is particularly useful in applications such as photography or lighting design,
 * where color temperatures are often needed in Kelvin for standardization and equipment settings.
 *
 * @param miredTemperature - The color temperature in Mired to be converted to Kelvin.
 * @returns The corresponding Kelvin temperature, computed as the floor of one million divided by the Mired temperature.
 *
 * @example
 * // Example usage:
 * const kelvinValue = mired2kelvin(200);
 * console.log(kelvinValue); // Outputs: 5000, representing the Kelvin equivalent of 200 Mired
 */
export const mired2kelvin = (miredTemperature: number) =>
  Math.floor(1000000 / miredTemperature);
