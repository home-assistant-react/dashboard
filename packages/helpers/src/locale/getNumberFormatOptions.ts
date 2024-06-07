import {
  HassEntityRegistryDisplayEntry,
  HassEntityState,
} from "@home-assistant-react/types/src";

/**
 * Determines the number format options based on the provided entity state and display configuration.
 *
 * @param entityState - The Home Assistant entity state.
 * @param entity - The Home Assistant entity display configuration.
 * @returns The number format options for formatting numbers, or undefined if default formatting should be used.
 *
 * @example
 * // Example usage:
 * const options = getNumberFormatOptions(entityState, entity);
 * console.log(options); // Outputs: { maximumFractionDigits: 2, minimumFractionDigits: 2 } or { maximumFractionDigits: 0 } or undefined
 */
export const getNumberFormatOptions = (
  entityState: HassEntityState,
  entity?: HassEntityRegistryDisplayEntry,
): Intl.NumberFormatOptions | undefined => {
  const precision = entity?.display_precision;
  if (precision != null) {
    return {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    };
  }
  if (
    Number.isInteger(Number(entityState.attributes?.step)) &&
    Number.isInteger(Number(entityState.state))
  ) {
    return { maximumFractionDigits: 0 };
  }
  return undefined;
};
