import { CSSProperties } from "react";
import { getObjectKeys } from "../objects";
import { decamelize } from "../strings";

/**
 * Converts a record of style properties into CSS custom properties (CSS variables),
 * formatted for use within React's CSSProperties or similar styling contexts. This function
 * filters and formats a given record, excluding undefined, null, and boolean values, and
 * transforms the keys from camelCase (or any case) to kebab-case, prefixed with '--' suitable
 * for CSS variable naming conventions.
 *
 * @param vars - A record object where keys are the names of CSS properties (in any case format)
 *               and values are the corresponding values for these properties, which can be string,
 *               number, or other types that are valid for conversion to string, excluding undefined,
 *               null, and boolean types.
 * @returns A record where each key is a CSS custom property name and each value is a string,
 *          formatted as valid CSSProperties for use in stylesheets or inline styles.
 *
 * @example
 * // Example usage:
 * const styleVars = cssVars({
 *   primaryColor: "blue",
 *   opacityLevel: 0.5,
 *   isActive: true
 * });
 * console.log(styleVars); // Outputs: { '--primary-color': 'blue', '--opacity-level': '0.5' }
 */
export const cssVars = (
  vars: Record<string, string | number | undefined | null | boolean>,
) => {
  const output: Record<string, string> = {};

  getObjectKeys(vars).forEach((key) => {
    const value = vars[key];

    if (value !== undefined && value !== null && typeof value !== "boolean") {
      output[`--${decamelize(key, "-")}`] = value.toString();
    }
  });

  return output as CSSProperties;
};
