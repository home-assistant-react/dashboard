/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * Logs warning messages to the console. This function is a utility wrapper around `console.warn`,
 * allowing for variable numbers of arguments to be passed and logged as a warning.
 * It can handle any type of messages, from simple strings to complex objects.
 *
 * @param messages - An array of messages that can be of any type. Each message will be passed to `console.warn`.
 *
 * @example
 * // Example usage:
 * logWarning("Warning:", "Something might go wrong here", { problematicValue: 42 });
 * // This will log a warning to the console with the specified messages and details.
 */
export const logWarning = (...messages: any[]) => {
  // eslint-disable-next-line no-console
  console.warn(...messages);
};
