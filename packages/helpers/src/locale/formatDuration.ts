import { leftPad } from "../strings/leftPad";
import { UNIT_TO_MILLISECOND_CONVERT } from "@home-assistant-react/types/src";

/**
 * Formats a duration value into a string representation.
 *
 * @param duration - The duration value to format.
 * @param units - The units of the duration.
 * @returns The formatted duration string.
 *
 * @example
 * // Example usage:
 * const formattedDuration = formatDuration("5", "minutes"); // Outputs: "05:00:00"
 */
export const formatDuration = (duration: string, units: string): string =>
  leftPad(
    parseFloat(duration) * (UNIT_TO_MILLISECOND_CONVERT[units as never] || 0),
  ) || "0";
