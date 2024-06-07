/**
 * Converts radians to degrees.
 *
 * @param rad - The angle in radians.
 * @returns The equivalent angle in degrees.
 *
 * @example
 * // Example usage:
 * const degrees = rad2deg(Math.PI / 2);
 * console.log(degrees); // Outputs: 90
 */
export const rad2deg = (rad: number) => {
  return (rad * 180) / Math.PI;
};
