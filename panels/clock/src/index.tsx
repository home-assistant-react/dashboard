import React from "react";
import { ClockOptions } from "./types";
import { Flex } from "@home-assistant-react/ui/src";
import moment from "moment";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { PanelFC } from "@home-assistant-react/types/src";

const classes = {
  Wrapper: "text-5xl justify-center font-light p-14 w-full",
};

const CLockComponent: React.FC<{ currentTime: React.ReactNode }> = ({
  currentTime,
}) => {
  return <Flex className={classes.Wrapper}>{currentTime}</Flex>;
};

export const Clock: PanelFC<ClockOptions> = (props) => {
  const options = props.panel.options;
  const timeFormat = options?.timeFormat || "hh:mm A";
  const [currentTime, setCurrentTime] = React.useState(
    moment().format(timeFormat),
  );

  React.useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(moment().format(timeFormat)),
      1000,
    );

    return () => clearInterval(interval);
  }, []);

  return <CLockComponent currentTime={currentTime} />;
};

Clock.previewPanel = () => (
  <CLockComponent currentTime={moment().format("hh:mm A")} />
);
Clock.getIcon = (_, options) => getMdiIcon("clock", options);
