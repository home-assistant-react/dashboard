import { v4 as uuid } from "uuid";
/**
 * Generates a unique identifier string, optionally prefixed with a specified string.
 *
 * @param prefix - An optional string to prepend to the generated UUID. Default is an empty string.
 * @returns A unique identifier string consisting of the prefix followed by a UUID.
 *
 * @example
 * // Example usage:
 * const uniqueId = getUniqueId("user-");
 * console.log(uniqueId); // Outputs: "user-<UUID>"
 *
 * const anotherUniqueId = getUniqueId();
 * console.log(anotherUniqueId); // Outputs: "<UUID>"
 */
export const getUniqueId = (prefix = "") => {
  return `${prefix}${uuid()}`;
};
