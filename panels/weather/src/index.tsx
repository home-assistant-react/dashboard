import React from "react";
import { Box, Flex, Span } from "@home-assistant-react/ui/src";
import { formatDateYYMMDD } from "@home-assistant-react/helpers/src/dates/formatDateYYMMDD";
import { formatPercentage } from "@home-assistant-react/helpers/src/locale/formatPercentage";
import { capitalize } from "@home-assistant-react/helpers/src";
import { FullForecast } from "./providers/openweather/types/response";
import { WeatherData, WeatherOptions } from "./types";
import * as OpenWeather from "./providers/openweather";
import moment from "moment";
import axios from "axios";
import { EditorPropertyType, PanelFC } from "@home-assistant-react/types/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";

const classes = {
  Wrapper: "items-center justify-center w-full h-full flex-col relative",
  MainTemperature: "text-6xl font-light right-14 top-8 absolute",
  MainTemperatureDeg: "font-light text-3xl top-0 absolute",
  MainDescription: "font-light text-2xl text-white p-4",
  MainIcon: "w-full h-full max-w-[200px] max-h-[200px]",
  HourlyIcon: "w-full h-full max-w-[50px] min-h[50px]",
  HourlyContainer: "w-full py-10 justify-center",
  HourlyContainerItem: "px-12",
  SecondaryInfoContainer: "gap-4",
};

export const WEATHER_DEFAULT_UPDATE_TIME = 30 * 60 * 1000;

export const Weather: PanelFC<WeatherOptions> = (props) => {
  const options = props.panel.options;
  const [data, setData] = React.useState<WeatherData | null>(null);

  const [currentDate, setCurrentDate] = React.useState(
    formatDateYYMMDD(new Date()),
  );

  const getWeatherData = () => {
    axios<FullForecast>({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${
        options?.lat || ""
      }&lon=${options?.lon || ""}&appid=${options?.apiKey || ""}&units=${
        options?.units || "metric"
      }&lang=${options?.lang || "en"}&exclude=alerts`,
    })
      .then((response) => {
        setData(OpenWeather.mapData(response.data));
      })
      .catch(() => {
        // Do nothing
      });
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      getWeatherData();
      setCurrentDate(formatDateYYMMDD(new Date()));
    }, options?.updateTime || WEATHER_DEFAULT_UPDATE_TIME);

    return () => clearTimeout(timeout);
  }, [currentDate]);

  React.useEffect(() => {
    getWeatherData();
  }, []);

  if (!data) return;

  return (
    <Flex className={classes.Wrapper}>
      <Box className={classes.MainTemperature}>
        {Math.round(data.current.temp)}
        <Span className={classes.MainTemperatureDeg}>&deg;</Span>
      </Box>
      <Flex className={classes.MainDescription}>
        {capitalize(data.current.description)}
      </Flex>
      {React.createElement(OpenWeather.getIcon(data.current.icon) || "div", {
        className: classes.MainIcon,
      })}
      <Flex className={classes.SecondaryInfoContainer}>
        <Box>
          Humidity <Span>{formatPercentage(data.current.humidity)}</Span>
        </Box>
        <Box>
          Wind speed <Span>{data.current.wind_speed}</Span>
        </Box>
      </Flex>
      <Flex className={classes.HourlyContainer}>
        {data.hourly.map((hourly, boxIndex) => (
          <Box key={boxIndex}>
            {React.createElement(OpenWeather.getIcon(hourly.icon) || "div", {
              className: classes.HourlyIcon,
            })}
            {moment(hourly.startTime).format("HH")}
            {" - "}
            {moment(hourly.endTime).format("HH")}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

Weather.configOptions = {
  customOptions: [
    {
      title: "Options",
      options: [
        {
          type: EditorPropertyType.Text,
          name: "apiKey",
          label: "API Key",
        },
      ],
    },
  ],
};
Weather.customStyles = {};

Weather.panelInitialStyle = {
  background:
    "linear-gradient(158deg, rgba(67,68,165,1) 0%, rgba(64,65,118,1) 100%)",
};

Weather.getIcon = (_, options) => getMdiIcon("weatherPartlyRainy", options);
