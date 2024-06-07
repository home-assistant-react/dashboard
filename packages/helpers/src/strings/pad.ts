/**
 * Pads a number or string with leading zeros to ensure it reaches a specified length.
 *
 * @param num - The number or string to be padded.
 * @param size - The desired length of the resulting string. Default is 2.
 * @returns A string representation of the input, padded with leading zeros to the specified length.
 *
 * @example
 * // Example usage:
 * const paddedNumber = pad(5, 3);
 * console.log(paddedNumber); // Outputs: "005"
 *
 * const paddedString = pad("7", 4);
 * console.log(paddedString); // Outputs: "0007"
 */
export const pad = (num: number | string, size = 2) => {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
};
