/**
 * Clamps a number within the specified minimum and maximum bounds.
 * If the value is less than the minimum, the minimum is returned.
 * If the value is greater than the maximum, the maximum is returned.
 * If the maximum is less than the minimum, an error is thrown.
 *
 * @param val - The number to clamp.
 * @param min - The minimum bound.
 * @param max - The maximum bound.
 * @returns The clamped number, or the original value if it is within bounds.
 * @throws An error if the maximum bound is less than the minimum bound.
 *
 * @example
 * // Example usage:
 * const clampedValue = clamp(10, 0, 5);
 * console.log(clampedValue); // Outputs: 5
 *
 * const withinBounds = clamp(3, 0, 5);
 * console.log(withinBounds); // Outputs: 3
 *
 * // Throws an error:
 * // clamp(10, 5, 0);
 */
export function clamp(val: number, min: number, max: number) {
  if (val == null) {
    return val;
  }
  if (max < min) {
    throw new Error("clamp: max cannot be less than min");
  }
  return Math.min(Math.max(val, min), max);
}
