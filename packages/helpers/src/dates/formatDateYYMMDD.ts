import moment from "moment";

/**
 * Formats a given date object or date string into the "YYYY-MM-DD" format.
 * This function utilizes the `moment` library to parse and format dates,
 * ensuring consistency across different date inputs. It returns the date formatted
 * in the standard year-month-day order, which is widely used for international contexts
 * and sorting purposes.
 *
 * @param date - A `Date` object or a date string that can be understood by the `moment` library.
 * @returns A string representing the formatted date in "YYYY-MM-DD" format.
 *
 * @example
 * // Example usage:
 * const formattedDate = formatDateYYMMDD(new Date(2020, 0, 1));
 * console.log(formattedDate); // Outputs: '2020-01-01'
 *
 * const formattedDateString = formatDateYYMMDD('2020-01-01T14:20:30Z');
 * console.log(formattedDateString); // Outputs: '2020-01-01'
 */
export function formatDateYYMMDD(date: Date | string) {
  return moment(date).format("YYYY-MM-DD");
}
