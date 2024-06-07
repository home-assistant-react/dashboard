import {
  DateFormat,
  FirstWeekday,
  NumberFormat,
  TimeFormat,
  TimeZone,
} from "./translations";

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
  date_format: DateFormat;
  first_weekday: FirstWeekday;
  time_zone: TimeZone;
}
