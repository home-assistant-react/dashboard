import { Condition } from "./condition";
import { WeatherIcon } from "./weathericon";

/**
 * User-facing information about the weather conditions.
 */
export interface WeatherBlock {
  /**
   * Weather condition id.
   *
   * See {@link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 Weather Condition Codes} for more info.
   */
  id: Condition;

  /**
   * Group of weather parameters (Rain, Snow, Extreme etc.)
   */
  main: string;

  /**
   * Weather condition within the group.
   *
   * The description can be translated using the `lang=` parameter in the request.
   */
  description: string;

  /**
   * Weather condition icon id.
   */
  icon: WeatherIcon;
}
