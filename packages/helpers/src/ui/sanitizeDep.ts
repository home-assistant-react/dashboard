/**
 * Sanitizes a given dependency by converting it to a JSON string.
 * This function is useful for ensuring that the dependency is in a consistent and serializable format,
 * typically for use in contexts where a stable string representation is required.
 *
 * @param dep - The dependency to sanitize, which can be of any type.
 * @returns A JSON string representation of the input dependency.
 *
 * @example
 * // Example usage:
 * const sanitizedDep = sanitizeDep({ key: "value" });
 * console.log(sanitizedDep); // Outputs: '{"key":"value"}'
 */
export const sanitizeDep = (dep: unknown) => {
  return JSON.stringify(dep);
};
