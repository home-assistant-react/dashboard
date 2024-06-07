import { NumberFormat } from "@home-assistant-react/types/src/home-assistant/frontend/translations";
import { FrontendLocaleData } from "@home-assistant-react/types/src";

/**
 * Determines the locale format for numbers based on the specified locale options.
 *
 * @param localeOptions - The frontend locale data containing number format information.
 * @returns The locale or locales for number formatting, or undefined for system default.
 *
 * @example
 * // Example usage:
 * const locale = numberFormatToLocale({ number_format: NumberFormat.comma_decimal, language: "en" });
 * console.log(locale); // Outputs: ["en-US", "en"]
 */
export const numberFormatToLocale = (
  localeOptions: FrontendLocaleData,
): string | string[] | undefined => {
  switch (localeOptions.number_format) {
    case NumberFormat.comma_decimal:
      return ["en-US", "en"]; // Use United States with fallback to English formatting 1,234,567.89
    case NumberFormat.decimal_comma:
      return ["de", "es", "it"]; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case NumberFormat.space_comma:
      return ["fr", "sv", "cs"]; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case NumberFormat.system:
      return undefined;
    default:
      return localeOptions.language;
  }
};
