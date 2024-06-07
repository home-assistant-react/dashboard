/**
 * Converts Cartesian coordinates (x, y) to polar coordinates (r, φ).
 *
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @returns An array containing the polar coordinates [r, φ].
 *
 * @example
 * // Example usage:
 * const [r, phi] = xy2polar(3, 4);
 * console.log(r);   // Outputs: 5
 * console.log(phi); // Outputs: 0.9272952180016122
 */
export const xy2polar = (x: number, y: number) => {
  const r = Math.sqrt(x * x + y * y);
  const phi = Math.atan2(y, x);
  return [r, phi];
};
