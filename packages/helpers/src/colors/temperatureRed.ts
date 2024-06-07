import { clamp } from "../numbers";

/**
 * Calculates the red component of an RGB color based on a color temperature.
 * This function determines the red value using a conditional approach:
 * - For temperatures at or below 66 degrees, the red component is set to its maximum value (255).
 * - For temperatures above 66 degrees, it uses a power-based formula to calculate the red value, which decreases as temperature increases.
 * The calculated red value is then clamped to ensure it remains within the standard RGB range of 0 to 255.
 *
 * @param temperature - The normalized color temperature value (actual temperature / 100).
 * @returns The red component of the RGB color as a number from 0 to 255.
 *
 * @example
 * // Example usage:
 * const redComponent = temperatureRed(70); // Normalized color temperature
 * console.log(redComponent); // Outputs a number representing the red component adjusted for the given color temperature.
 */
export const temperatureRed = (temperature: number): number => {
  if (temperature <= 66) {
    return 255;
  }
  const red = 329.698727446 * (temperature - 60) ** -0.1332047592;
  return clamp(red, 0, 255);
};
