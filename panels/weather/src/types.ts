export interface WeatherOptions {
  lat: number;

  apiKey: string;
  units?: string;
  lang?: string;
  lon?: number;
  updateTime?: number;
}

export interface WeatherDataBlock {
  time: number;
  clouds: number;
  temp: number;
  feels_like: number;
  uvi: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  icon: string;
  description: string;
  wind_deg: number;
  wind_speed: number;
  humidity: number;
}

export interface HourlyWeatherDataBlock extends WeatherDataBlock {
  startTime: number;
  endTime: number;
}

export interface WeatherData {
  current: WeatherDataBlock;
  hourly: HourlyWeatherDataBlock[];
}
