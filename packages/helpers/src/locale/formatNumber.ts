import { numberFormatToLocale } from "./numberFormatToLocale";
import { FrontendLocaleData } from "@home-assistant-react/types/src";
import { NumberFormat } from "@home-assistant-react/types/src/home-assistant/frontend/translations";
import { round } from "../numbers";
import { getDefaultFormatOptions } from "./getDefaultFormatOptions";

/**
 * Formats a number based on the user's preference with thousands separator(s) and decimal character for better legibility.
 *
 * @param num The number to format
 * @param localeOptions The user-selected language and formatting, from `hass.locale`
 * @param options Intl.NumberFormatOptions to use
 */
export const formatNumber = (
  num: string | number,
  localeOptions?: FrontendLocaleData,
  options?: Intl.NumberFormatOptions,
): string => {
  const locale = localeOptions
    ? numberFormatToLocale(localeOptions)
    : undefined;

  // Polyfill for Number.isNaN, which is more reliable than the global isNaN()
  /*Number.isNaN =
        Number.isNaN ||
        function isNaN(input) {
          return typeof input === "number" && isNaN(input);
        };*/

  if (
    localeOptions?.number_format !== NumberFormat.none &&
    !Number.isNaN(Number(num)) &&
    Intl
  ) {
    try {
      return new Intl.NumberFormat(
        locale,
        getDefaultFormatOptions(num, options),
      ).format(Number(num));
    } catch (err: unknown) {
      // Don't fail when using "TEST" language
      // eslint-disable-next-line no-console
      console.error(err);
      return new Intl.NumberFormat(
        undefined,
        getDefaultFormatOptions(num, options),
      ).format(Number(num));
    }
  }

  if (
    !Number.isNaN(Number(num)) &&
    num !== "" &&
    localeOptions?.number_format === NumberFormat.none &&
    Intl
  ) {
    // If NumberFormat is none, use en-US format without grouping.
    return new Intl.NumberFormat(
      "en-US",
      getDefaultFormatOptions(num, {
        ...options,
        useGrouping: false,
      }),
    ).format(Number(num));
  }

  if (typeof num === "string") {
    return num;
  }
  return `${round(num, options?.maximumFractionDigits).toString()}${
    options?.style === "currency" ? ` ${options.currency}` : ""
  }`;
};
