/**
 * Formats a percentage value into a string representation with a percentage sign.
 *
 * @param percentage - The percentage value to format.
 * @returns The formatted percentage string.
 *
 * @example
 * // Example usage:
 * const formattedPercentage = formatPercentage(75); // Outputs: "75%"
 */
export const formatPercentage = (percentage: number | string) => {
  return `${percentage}%`;
};
