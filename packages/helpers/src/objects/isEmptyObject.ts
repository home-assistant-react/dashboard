/**
 * Checks if an object is empty (i.e., has no own properties).
 *
 * @param obj - The object to be checked.
 * @returns A boolean indicating whether the object is empty (true) or not (false).
 *
 * @example
 * // Example usage:
 * const emptyObj = {};
 * const nonEmptyObj = { key: 'value' };
 * console.log(isEmptyObject(emptyObj)); // Outputs: true
 * console.log(isEmptyObject(nonEmptyObj)); // Outputs: false
 */
export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;
