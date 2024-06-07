/**
 * Pauses the execution for a specified amount of time.
 * This function returns a promise that resolves after the specified duration,
 * effectively creating a delay or sleep in asynchronous code.
 *
 * @param time - The duration of the sleep in milliseconds.
 * @returns A promise that resolves after the specified time.
 *
 * @example
 * // Example usage:
 * async function example() {
 *   console.log('Start');
 *   await sleep(2000); // Pauses execution for 2 seconds
 *   console.log('End');
 * }
 * example();
 */
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
