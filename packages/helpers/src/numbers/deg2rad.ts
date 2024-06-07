/**
 * Converts degrees to radians.
 *
 * @param deg - The angle in degrees to convert to radians.
 * @returns The angle converted to radians.
 *
 * @example
 * // Example usage:
 * const radians = deg2rad(180);
 * console.log(radians); // Outputs: 3.141592653589793
 */
export function deg2rad(deg: number) {
  return (deg / 360) * 2 * Math.PI;
}
