/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/minutely.ts */
export interface MinutelyDataBlock {
  /**
   * Time of the forecasted data, unix, UTC.
   */
  dt: number;

  /**
   * Precipitation volume, a number value measured in millimeters (mm).
   */
  precipitation: number;
}
