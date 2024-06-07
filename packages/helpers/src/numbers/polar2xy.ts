/**
 * Converts polar coordinates to Cartesian coordinates.
 *
 * @param r - The radial distance from the origin.
 * @param phi - The angle in radians measured from the positive x-axis.
 * @returns The Cartesian coordinates [x, y].
 *
 * @example
 * // Example usage:
 * const [x, y] = polar2xy(5, Math.PI / 4);
 * console.log(x, y); // Outputs: approximately [3.54, 3.54]
 */
export const polar2xy = (r: number, phi: number): [number, number] => {
  const x = r * Math.cos(phi);
  const y = r * Math.sin(phi);
  return [x, y];
};
