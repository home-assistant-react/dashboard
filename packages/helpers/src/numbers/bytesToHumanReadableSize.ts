const sizes: string[] = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Converts a size in bytes to a human-readable string with appropriate units.
 *
 * @param bytes - The size in bytes to be converted.
 * @returns A string representing the size in a human-readable format with appropriate units (e.g., "KB", "MB").
 *
 * @example
 * // Example usage:
 * const readableSize = bytesToHumanReadableSize(1024);
 * console.log(readableSize); // Outputs: "1 KB"
 *
 * const largeSize = bytesToHumanReadableSize(1048576);
 * console.log(largeSize); // Outputs: "1 MB"
 */
export function bytesToHumanReadableSize(bytes: number): string {
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
