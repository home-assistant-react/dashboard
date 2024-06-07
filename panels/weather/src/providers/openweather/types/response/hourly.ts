/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/hourly.ts */
import { DataBlock, PrecipitationDataPoint } from "./datablock";

/**
 * A [[DataBlock]] that represents the hourly forecast information.
 */
export interface HourlyDataBlock extends DataBlock {
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
   * Volume of rain for the last hour, measured in mm.
   */
  rain?: PrecipitationDataPoint;

  /**
   * Volume of snow for the last hour, measured in mm.
   */
  snow?: PrecipitationDataPoint;

  /**
   * Probability of precipitation.
   */
  pop: number;

  visibility: number;
}
