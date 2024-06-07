/**
 * Converts an array of objects into a record (object), mapping each object to a key specified from one of its properties.
 *
 * @param array - An array of objects to be transformed into a record.
 * @param key - The property of the objects in the array that will be used as the key in the resulting record.
 * @returns A record object where keys are derived from the specified property of each object in the array, and values are the corresponding objects.
 *
 * @template T - Specifies that the input is an array of objects, and that the `key` must be a property of the objects in the array.
 *
 * @example
 * // Example usage:
 * const pets = [{ id: 'a1', type: 'dog' }, { id: 'b2', type: 'cat' }];
 * const petsById = mapArrayToRecord(pets, 'id');
 * console.log(petsById['a1']); // Outputs: { id: 'a1', type: 'dog' }
 * console.log(petsById['b2']); // Outputs: { id: 'b2', type: 'cat' }
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const mapArrayToRecord = <T extends any[] = []>(
  array: T,
  key: keyof T[0],
): Record<string, T[0]> => {
  return array.reduce((acc, item) => {
    const itemKey = item[key];
    return {
      ...acc,
      [itemKey]: item,
    };
  }, {});
};
