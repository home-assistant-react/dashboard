/**
 * Splits an array into smaller groups of a specified size.
 *
 * @param arr - The array to be split into groups.
 * @param groupSize - The number of elements in each group.
 * @returns An array of arrays, where each sub-array represents a group containing up to `groupSize` elements from the original array.
 *
 * @template T - The type of the elements in the input array, allowing the function to handle arrays of any type.
 *
 * @example
 * // Example usage:
 * const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
 * const groupedLetters = packIntoGroups(letters, 2);
 * console.log(groupedLetters); // Outputs: [['a', 'b'], ['c', 'd'], ['e', 'f']]
 */
export function packIntoGroups<T>(arr: T[], groupSize: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += groupSize) {
    const group = arr.slice(i, i + groupSize);
    result.push(group);
  }

  return result;
}
