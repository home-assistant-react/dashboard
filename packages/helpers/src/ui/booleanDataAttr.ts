/**
 * Converts a boolean value to a format suitable for use as a data attribute.
 *
 * @param value - The boolean value to be converted.
 * @returns An empty string if the value is true, or undefined if the value is false or undefined.
 *
 * @example
 * // Example usage:
 * const attrValue = booleanDataAttr(true);
 * console.log(attrValue); // Outputs: ""
 *
 * const attrValueFalse = booleanDataAttr(false);
 * console.log(attrValueFalse); // Outputs: undefined
 */
export const booleanDataAttr = (value?: boolean) =>
  value === true ? "" : undefined;
