import { CustomDate } from "./types";
import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";

type WeekdayWasteMap = {
  [key: string]: WasteType | undefined;
};

export const findTypeByDate = (
  weekdayMap: WeekdayWasteMap,
  daysAndMonths: CustomDate[],
  weekDaysAndMonths: CustomDate[],
  dateStr: string,
): WasteType => {
  const dateObj = new Date(dateStr);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayOfWeek = String(dateObj.getUTCDay());
  const dayOfWeekString = days[dateObj.getUTCDay()];
  const dayOfMonth = String(dateObj.getUTCDate());
  const month = String(dateObj.getUTCMonth() + 1); // getMonth() returns 0-11

  // Check the daysAndMonths list (higher priority)
  for (const entry of daysAndMonths) {
    if (entry.day === dayOfMonth && entry.month === month) {
      return entry.type;
    }
  }

  // Check the weekDaysAndMonths list
  for (const entry of weekDaysAndMonths) {
    if (entry.weekDay === dayOfWeek && entry.month === month) {
      return entry.type;
    }
  }

  // Check the weekdayMap (lowest priority)
  return weekdayMap[dayOfWeekString] || WasteType.None;
};
