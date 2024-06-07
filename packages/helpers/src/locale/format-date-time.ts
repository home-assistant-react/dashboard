import { FrontendLocaleData } from "@home-assistant-react/types/src";
import memoizeOne from "memoize-one";
import { TimeFormat } from "@home-assistant-react/types/src/home-assistant/frontend/translations";

/**
 * Checks if the given locale uses AM/PM time format.
 *
 * @param locale - The locale data.
 * @returns A boolean indicating whether the locale uses AM/PM time format.
 *
 * @example
 * // Example usage:
 * const isAmPm = localeHasAmPm(myLocaleData); // Outputs: true or false
 */
export const localeHasAmPm = (locale: FrontendLocaleData): boolean => {
  if (
    locale.time_format === TimeFormat.language ||
    locale.time_format === TimeFormat.system
  ) {
    const testLanguage =
      locale.time_format === TimeFormat.language ? locale.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(
      testLanguage,
    );
    return test.includes("10");
  }

  return locale.time_format === TimeFormat.am_pm;
};

/**
 * Formats a date and time value according to the specified locale.
 *
 * @param dateObj - The date object to format.
 * @param locale - The locale data.
 * @param timeZone - Optional. The time zone to use for formatting.
 * @returns The formatted date and time string.
 *
 * @example
 * // Example usage:
 * const formattedDateTime = formatDateTime(new Date(), myLocaleData, "America/New_York");
 */
const formatDateTimeMem = memoizeOne(
  (locale: FrontendLocaleData, timeZone?: string) =>
    new Intl.DateTimeFormat(locale.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: localeHasAmPm(locale) ? "numeric" : "2-digit",
      minute: "2-digit",
      hourCycle: localeHasAmPm(locale) ? "h12" : "h23",
      timeZone: locale.time_zone === "server" ? timeZone : undefined,
    }),
);

export const formatDateTime = (
  dateObj: Date,
  locale: FrontendLocaleData,
  timeZone?: string,
) => formatDateTimeMem(locale, timeZone).format(dateObj);
