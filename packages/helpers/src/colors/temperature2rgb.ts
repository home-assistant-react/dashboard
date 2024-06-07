import { temperatureRed } from "./temperatureRed";
import { temperatureGreen } from "./temperatureGreen";
import { temperatureBlue } from "./temperatureBlue";

/**
 * Converts a color temperature in Kelvin to its corresponding RGB (Red, Green, Blue) representation.
 * This function takes a temperature value, adjusts it by dividing by 100 for processing, and then converts this temperature
 * using separate functions for each color component (Red, Green, and Blue).
 *
 * @param temperature - The color temperature in Kelvin to be converted into RGB values.
 * @returns An RGB tuple where each element corresponds to the Red, Green, and Blue components derived from the given temperature.
 *
 * @example
 * // Example usage:
 * const rgbFromTemp = temperature2rgb(5000); // Converts a 5000 Kelvin temperature to RGB
 * console.log(rgbFromTemp); // Outputs an RGB tuple, e.g., [255, 228, 206], which represents a typical daylight color.
 */
export const temperature2rgb = (
  temperature: number,
): [number, number, number] => {
  const value = temperature / 100;
  return [
    temperatureRed(value),
    temperatureGreen(value),
    temperatureBlue(value),
  ];
};
