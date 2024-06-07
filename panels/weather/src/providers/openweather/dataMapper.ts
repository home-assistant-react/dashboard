import {
  HourlyWeatherDataBlock,
  WeatherData,
  WeatherDataBlock,
} from "../../types";
import { FullForecast } from "./types/response";
import { DataBlock } from "./types/response/datablock";

const weatherGrade = [
  "snow",
  "thunderstorm",
  "rain",
  "drizzle",
  "atmosphere",
  "clouds",
  "clear",
];

const getAverage = (a: DataBlock, b: DataBlock): WeatherDataBlock => {
  const main =
    weatherGrade.indexOf(String(a.weather[0].main).toLowerCase()) <
    weatherGrade.indexOf(String(b.weather[0].main).toLowerCase())
      ? a
      : b;

  return {
    time: a.dt,
    clouds: Math.max(a.clouds, b.clouds),
    temp: Math.max(
      typeof a.temp === "number" ? a.temp : 0,
      typeof b.temp === "number" ? b.temp : 0,
    ),
    feels_like: Math.max(
      typeof a.feels_like === "number" ? a.feels_like : 0,
      typeof b.feels_like === "number" ? b.feels_like : 0,
    ),
    visibility: Math.max(
      typeof a.visibility === "number" ? a.visibility : 0,
      typeof b.visibility === "number" ? b.visibility : 0,
    ),
    icon: main.weather[0].icon,
    description: main.weather[0].description,
    wind_deg: Math.max(a.wind_deg, b.wind_deg),
    wind_speed: Math.max(a.wind_speed, b.wind_speed),
    uvi: Math.max(
      typeof a.uvi === "number" ? a.uvi : 0,
      typeof b.uvi === "number" ? b.uvi : 0,
    ),
    humidity: Math.max(a.humidity, b.humidity),
    sunrise: 0,
    sunset: 0,
  };
};

const hourlyRangeIndexes = [
  [1, 6],
  [6, 12],
  [12, 18],
  [18, 24],
];

export const mapData = (data: FullForecast): WeatherData => {
  const hourly: HourlyWeatherDataBlock[] = [];
  hourlyRangeIndexes.forEach((range) => {
    if (data.hourly[range[0]] && data.hourly[range[1]]) {
      const avg = getAverage(data.hourly[range[0]], data.hourly[range[1]]);
      hourly.push({
        startTime: data.hourly[range[0]].dt * 1000,
        endTime: data.hourly[range[1]].dt * 1000,
        ...avg,
      });
    }
  });

  return {
    current: {
      time: data.current.dt,
      clouds: data.current.clouds,
      temp: data.current.temp,
      feels_like: data.current.feels_like,
      visibility: data.current.visibility,
      icon: data.current.weather[0].icon,
      description: data.current.weather[0].description,
      wind_deg: data.current.wind_deg,
      wind_speed: data.current.wind_speed,
      uvi: data.current.uvi,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      humidity: data.current.humidity,
    },
    hourly: hourly || [],
  };
};
