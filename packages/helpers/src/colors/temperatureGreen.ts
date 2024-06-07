import { clamp } from "../numbers";

/**
 * Calculates the green component of an RGB color based on a color temperature.
 * The function uses two distinct formulas based on the temperature range:
 * - For temperatures at or below 66 degrees, it employs a logarithmic formula.
 * - For temperatures above 66 degrees, it uses a power-based formula to calculate the green value.
 * The result is then clamped to ensure that the green component stays within the valid RGB range of 0 to 255.
 *
 * @param temperature - The normalized color temperature value (actual temperature / 100).
 * @returns The green component of the RGB color as a number from 0 to 255.
 *
 * @example
 * // Example usage:
 * const greenComponent = temperatureGreen(55); // Normalized color temperature
 * console.log(greenComponent); // Outputs a number representing the green component based on the color temperature.
 */
export const temperatureGreen = (temperature: number): number => {
  let green: number;
  if (temperature <= 66) {
    green = 99.4708025861 * Math.log(temperature) - 161.1195681661;
  } else {
    green = 288.1221695283 * (temperature - 60) ** -0.0755148492;
  }
  return clamp(green, 0, 255);
};
