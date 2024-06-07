/**
 * Returns a random element from a provided array.
 *
 * @param items - The array from which a random element will be selected.
 * @returns A random element from the specified array.
 *
 * @template T - Specifies that the function can handle arrays containing any type of elements.
 *
 * @example
 * // Example usage:
 * const numbers = [10, 20, 30, 40, 50];
 * const randomNumber = getRandomArrayValue(numbers);
 * console.log(randomNumber); // Outputs one of the numbers from the array
 */
export function getRandomArrayValue<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
