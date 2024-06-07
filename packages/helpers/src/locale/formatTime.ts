import memoizeOne from "memoize-one";
import { FrontendLocaleData } from "@home-assistant-react/types/src";
import { localeHasAmPm } from "./format-date-time";

const formatTimeMem = memoizeOne(
  (locale: FrontendLocaleData, timeZone?: string) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: "numeric",
      minute: "2-digit",
      hourCycle: localeHasAmPm(locale) ? "h12" : "h23",
      timeZone: locale.time_zone === "server" ? timeZone : undefined,
    }),
);

/**
 * Formats the time part of a Date object according to the specified locale and time zone.
 * Uses memoization for performance optimization.
 *
 * @param dateObj - The Date object to format.
 * @param locale - The locale data containing language and time zone information.
 * @param timeZone - The optional time zone string.
 * @returns The formatted time string.
 *
 * @example
 * // Example usage:
 * const formattedTime = formatTime(new Date(), { language: "en" }); // Outputs: "12:34 PM"
 */
export const formatTime = (
  dateObj: Date,
  locale: FrontendLocaleData,
  timeZone?: string,
) => formatTimeMem(locale, timeZone).format(dateObj);
