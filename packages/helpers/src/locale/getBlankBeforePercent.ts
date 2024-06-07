import { FrontendLocaleData } from "@home-assistant-react/types/src";

/**
 * Retrieves the blank character before the percent sign based on the specified locale.
 * Returns a blank space for certain languages (Czech, German, Finnish, French, Slovak, and Swedish), otherwise an empty string.
 *
 * @param localeOptions - The locale options containing language information.
 * @returns The blank character before the percent sign based on the locale.
 *
 * @example
 * // Example usage:
 * const blankSpace = getBlankBeforePercent({ language: "de" }); // Outputs: " "
 */
export const getBlankBeforePercent = (
  localeOptions: FrontendLocaleData,
): string => {
  switch (localeOptions?.language) {
    case "cz":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
};
