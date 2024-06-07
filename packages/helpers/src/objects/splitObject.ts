import { getObjectKeys } from "./getObjectKeys";

/**
 * Splits an object into two parts: one containing the specified keys and the other containing the remaining keys.
 *
 * @param obj - The object to be split.
 * @param keys - An array of keys to include in the first part of the split object.
 * @returns A tuple where the first element is an object with the specified keys, and the second element is an object with the remaining keys.
 *
 * @example
 * // Example usage:
 * const obj = { a: 1, b: 2, c: 3, d: 4 };
 * const [included, excluded] = splitObject(obj, ['a', 'c']);
 * console.log(included); // Outputs: { a: 1, c: 3 }
 * console.log(excluded); // Outputs: { b: 2, d: 4 }
 */
export function splitObject<T, K extends keyof T>(
  obj: T,
  keys: K[],
): [Pick<T, K>, { [P in Exclude<keyof T, K>]: T[P] }] {
  const included: Partial<Pick<T, K>> = {};
  const excluded: Partial<{ [P in Exclude<keyof T, K>]: T[P] }> = {};

  getObjectKeys(obj as object).forEach((key) => {
    if (keys.includes(key as K)) {
      included[key as K] = obj[key];
    } else {
      excluded[key as Exclude<keyof T, K>] = obj[key];
    }
  });

  return [
    included as Pick<T, K>,
    excluded as { [P in Exclude<keyof T, K>]: T[P] },
  ];
}
