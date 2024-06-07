/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/daily.ts */
import { DataBlock } from "./datablock";

export interface DailyDataBlock extends DataBlock {
  /**
   * Sunrise time as a UTC Unix timestamp.
   */
  sunrise: number;

  /**
   * Sunsise time as a UTC Unix timestamp.
   */
  sunset: number;

  /**
   * The time of when the moon rises for this day, Unix, UTC
   */
  moonrise: number;

  /**
   * The time of when the moon sets for this day, Unix, UTC
   */
  moonset: number;

  /**
   * Moon phase.
   *
   * - 0 and 1 are 'new moon'
   * - 0.25 is 'first quarter moon'
   * - 0.5 is 'full moon'
   * - 0.75 is 'last quarter moon'.
   *
   * The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous',
   * and 'waning crescent', respectively.
   */
  moon_phase: number;

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: TemperatureBlock;

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: TemperatureDayBlock;

  /**
   * Midday UV index.
   */
  uvi: number;

  /**
   * Volume of rain for the day, measured in mm.
   */
  rain?: number;

  /**
   * Volume of snow for the day, measured in mm.
   */
  snow?: number;

  /**
   * Probability of precipitation.
   */
  pop: number;
}

export interface TemperatureDayBlock {
  /**
   * Morning temperature.
   */
  morn: number;

  /**
   * Day temperature.
   */
  day: number;

  /**
   * Evening temperature.
   */
  eve: number;

  /**
   * Night temperature.
   */
  night: number;
}

export interface TemperatureBlock extends TemperatureDayBlock {
  /**
   * Minimum daily temperature.
   */
  min: number;

  /**
   * Maximum daily temperature.
   */
  max: number;
}
