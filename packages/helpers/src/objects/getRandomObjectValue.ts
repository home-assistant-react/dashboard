import { getObjectKeys } from "./getObjectKeys";

/**
 * Retrieves a random value from an object.
 *
 * @param object - The object from which to retrieve a random value.
 * @returns A random value from the object.
 *
 * @template T - The type of the value to be returned.
 *
 * @example
 * // Example usage:
 * const exampleObject = { a: 1, b: 2, c: 3 };
 * const randomValue = getRandomObjectValue<number>(exampleObject);
 * console.log(randomValue); // Outputs a random value from the object, e.g., 1, 2, or 3.
 */
export const getRandomObjectValue = <T extends object>(object: object): T => {
  const keys = getObjectKeys(object);
  const key = keys[(keys.length * Math.random()) << 0];
  return object[key];
};
