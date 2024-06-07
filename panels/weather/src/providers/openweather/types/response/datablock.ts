/* FRM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/datablock.ts */
import { WeatherBlock } from "./weather";
import { TemperatureBlock, TemperatureDayBlock } from "./daily";

/**
 * Precipitation data point.
 */
export interface PrecipitationDataPoint {
  /**
   * Precipitation volumn for the last hour, measured in millimeters (mm).
   */
  "1h": number;
}

/**
 * @internal
 *
 * Base datablock interface
 *
 * TODO: WEATHER IS AN ARRAY
 */
export interface DataBlock {
  /**
   * Time of the forecasted data, unix, UTC.
   */
  dt: number;

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: number | TemperatureBlock;

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: number | TemperatureDayBlock;

  /**
   * Atmospheric temperature on the sea level, measured in hectopascal (hPa).
   */
  pressure: number;

  /**
   * Humidity percentage.
   */
  humidity: number;

  /**
   *  Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  dew_point: number;

  /**
   * Cloudiness percent.
   */
  clouds: number;

  /**
   * Average visibility measured in metres (m).
   */
  visibility?: number;

  /**
   * Wind speed.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour
   */
  wind_speed: number;

  /**
   * Wind gust.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   */
  wind_gust?: number;

  /**
   * Wind direction in degrees (meteorological)
   */
  wind_deg: number;

  /**
   * Probability of precipitation.
   */
  pop?: number;

  /**
   * Volume of rain for the last hour, measured in mm.
   */
  rain?: PrecipitationDataPoint | number;

  /**
   * Volume of snow for the last hour, measured in mm.
   */
  snow?: PrecipitationDataPoint | number;

  /**
   * A block of user-facing weather information.
   */
  weather: WeatherBlock[];

  /**
   * Midday UV index.
   */
  uvi?: number;
}
