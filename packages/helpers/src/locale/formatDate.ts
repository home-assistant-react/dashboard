import { FrontendLocaleData } from "@home-assistant-react/types/src";
import memoizeOne from "memoize-one";

const formatDateMem = memoizeOne(
  (locale: FrontendLocaleData, timeZone?: string) =>
    new Intl.DateTimeFormat(locale.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: locale.time_zone === "server" ? timeZone : undefined,
    }),
);

/**
 * Formats a date value according to the specified locale.
 *
 * @param dateObj - The date object to format.
 * @param locale - The locale data.
 * @param timeZone - Optional. The time zone to use for formatting.
 * @returns The formatted date string.
 *
 * @example
 * // Example usage:
 * const formattedDate = formatDate(new Date(), myLocaleData, "America/New_York");
 */
export const formatDate = (
  dateObj: Date,
  locale: FrontendLocaleData,
  timeZone?: string,
) => formatDateMem(locale, timeZone).format(dateObj);
