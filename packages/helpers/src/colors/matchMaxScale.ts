/**
 * Scales an array of output colors to match the maximum value of an input color array.
 * This function calculates a scaling factor based on the maximum values in the input and output color arrays.
 * It then applies this factor to each value in the output array to scale the colors proportionally.
 * If the maximum value in the output array is zero, all outputs are scaled to zero to avoid division by zero errors.
 *
 * @param inputColors - Array of numbers representing the reference color values used to determine the scaling factor.
 * @param outputColors - Array of numbers representing the color values to be scaled.
 * @returns A new array where each value from the original output array has been scaled by the calculated factor.
 *
 * @example
 * // Example usage:
 * const input = [10, 20, 30];
 * const output = [1, 2, 3];
 * const scaledOutput = matchMaxScale(input, output);
 * console.log(scaledOutput); // Outputs: [3, 6, 9], scaled to match the maximum of the input array
 */
export const matchMaxScale = (
  inputColors: number[],
  outputColors: number[],
): number[] => {
  const maxIn: number = Math.max(...inputColors);
  const maxOut: number = Math.max(...outputColors);
  let factor: number;
  if (maxOut === 0) {
    factor = 0.0;
  } else {
    factor = maxIn / maxOut;
  }
  return outputColors.map((value) => Math.round(value * factor));
};
