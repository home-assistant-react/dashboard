export function stripUndefinedValuesFromObject<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}
