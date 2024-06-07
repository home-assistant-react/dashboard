import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";

export interface CustomDate {
  id: string;
  day: string;
  weekDay?: string;
  month: string;
  type: WasteType;
}

export interface WasteOptions {
  monday?: WasteType;
  tuesday?: WasteType;
  wednesday?: WasteType;
  thursday?: WasteType;
  friday?: WasteType;
  saturday?: WasteType;
  sunday?: WasteType;
  dates?: Record<string, WasteType>;
  customDates?: CustomDate[];
  customWeekDays?: CustomDate[];
  showNextDate?: boolean;
}
