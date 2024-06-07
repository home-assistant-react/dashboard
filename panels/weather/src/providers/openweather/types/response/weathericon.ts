/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/weathericon.ts */
/**
 * All of the supported icons for each weather condition.
 *
 * See {@link https://openweathermap.org/weather-conditions Weather Conditions} for more information.
 */
export enum WeatherIcon {
  ClearSky = "01d",
  ClearSkyNight = "01n",

  FewClouds = "02d",
  FewCloudsNight = "02n",

  ScatteredClouds = "03d",
  ScatteredCloudsNight = "03n",

  BrokenClouds = "04d",
  BrokenCloudsNight = "04n",

  ShowerRain = "09d",
  ShowerRainNight = "09n",

  Rain = "10d",
  RainNight = "10n",

  Thunderstorm = "11d",
  ThunderstormNight = "11n",

  Snow = "13d",
  SnowNight = "13n",

  Mist = "50d",
  MistNight = "50n",
}

/**
 * File extension for the icons.
 */
export const ICON_EXTENSION = ".png";

/**
 * OpenWeatherMap offers a double-sized icon.
 *
 * This value is added to the filename of the icon.
 */
export const LARGER_ICON = "@2x";
