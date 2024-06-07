/**
 * Creates a function that checks if an array includes a specified element, starting the search at a given index if provided.
 *
 * This function is a curried version of the native `Array.prototype.includes` method.
 * It first takes an array and returns a function that checks if a specific element is in the array.
 * The check can start from an optional index.
 *
 * @param array - The array to search within. This should be a read-only array.
 * @returns A function that takes a search element and an optional starting index.
 * The returned function checks if the search element is in the array, starting the search at `fromIndex` if provided.
 *
 * @template T - The type of the elements in the array. This ensures type safety by inferring the array element type.
 *
 * @example
 * const fruits = ['apple', 'banana', 'mango'] as const;
 * const includesFruit = arrayLiteralIncludes(fruits);
 * console.log(includesFruit('banana')); // true
 * console.log(includesFruit('cherry')); // false
 * console.log(includesFruit('mango', 2)); // true
 * console.log(includesFruit('apple', 1)); // false
 *
 * @callback-param searchElement - The element to search for in the array.
 * @callback-param fromIndex - The position in the array at which to begin the search. Defaults to 0.
 * @callback-returns `true` if the array contains the search element, starting from the specified index; otherwise, `false`.
 */
export const arrayLiteralIncludes =
  <T extends readonly unknown[]>(array: T) =>
  (searchElement: unknown, fromIndex?: number): searchElement is T[number] =>
    array.includes(searchElement as T[number], fromIndex);
