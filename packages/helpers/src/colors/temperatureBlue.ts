import { clamp } from "../numbers";

/**
 * Calculates the blue component of an RGB color based on a color temperature.
 * The function provides specific logic for temperatures:
 * - Above 66 degrees, the blue component is at its maximum (255).
 * - Below 19 degrees, the blue component is at its minimum (0).
 * For temperatures between 19 and 66 degrees, the blue value is calculated using a logarithmic formula.
 * Finally, the resulting blue value is clamped between 0 and 255 to ensure it falls within valid RGB ranges.
 *
 * @param temperature - The normalized color temperature value (actual temperature / 100).
 * @returns The blue component of the RGB color as a number from 0 to 255.
 *
 * @example
 * // Example usage:
 * const blueComponent = temperatureBlue(50); // Normalized color temperature
 * console.log(blueComponent); // Outputs a number representing the blue component based on the color temperature.
 */
export const temperatureBlue = (temperature: number): number => {
  if (temperature >= 66) {
    return 255;
  }
  if (temperature <= 19) {
    return 0;
  }
  const blue = 138.5177312231 * Math.log(temperature - 10) - 305.0447927307;
  return clamp(blue, 0, 255);
};
