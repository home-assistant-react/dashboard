/**
 * Generates default options for Intl.NumberFormat
 * @param num The number to be formatted
 * @param options The Intl.NumberFormatOptions that should be included in the returned options
 */
export const getDefaultFormatOptions = (
  num: string | number,
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormatOptions => {
  const defaultOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    ...options,
  };

  if (typeof num !== "string") {
    return defaultOptions;
  }

  // Keep decimal trailing zeros if they are present in a string numeric value
  if (
    !options ||
    (options.minimumFractionDigits === undefined &&
      options.maximumFractionDigits === undefined)
  ) {
    const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
    defaultOptions.minimumFractionDigits = digits;
    defaultOptions.maximumFractionDigits = digits;
  }

  return defaultOptions;
};
