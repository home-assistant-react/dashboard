/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/current.ts */
import { DataBlock, PrecipitationDataPoint } from "./datablock";

/**
 * A {@link DataBlock} that represents the current forecast information.
 */
export interface CurrentDataBlock extends DataBlock {
  /**
   * Sunrise time as a UTC Unix timestamp.
   */
  sunrise: number;

  /**
   * Sunsise time as a UTC Unix timestamp.
   */
  sunset: number;

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: number;

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: number;

  /**
   * Average visibility measured in metres (m).
   */
  visibility: number;

  /**
   * Midday UV index.
   */
  uvi: number;

  /**
   * Volume of rain for the last hour, measured in mm.
   */
  rain?: PrecipitationDataPoint;

  /**
   * Volume of snow for the last hour, measured in mm.
   */
  snow?: PrecipitationDataPoint;
}
