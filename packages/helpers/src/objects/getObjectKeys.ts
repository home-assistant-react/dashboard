/**
 * Retrieves the keys of an enum object, optionally including keys that can be parsed as NaN.
 *
 * @param obj - The enum object from which to retrieve keys.
 * @param allowNaN - Boolean flag indicating whether to include keys that can be parsed as NaN. Default is false.
 * @returns An array of keys from the enum object.
 *
 * @example
 * // Example usage:
 * enum ExampleEnum {
 *   First = 1,
 *   Second = 2,
 *   Third = "third"
 * }
 * const keys = getEnumKeys(ExampleEnum);
 * console.log(keys); // Outputs: ["First", "Second", "Third"]
 */
export const getEnumKeys = <O extends object, K extends keyof O = keyof O>(
  obj: O,
  allowNaN = false,
): K[] => {
  return Object.keys(obj).filter((k) =>
    allowNaN ? k : Number.isNaN(+k),
  ) as K[];
};

export const getObjectKeys = getEnumKeys;
