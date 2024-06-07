import { usePanel } from "@home-assistant-react/api/src";
import { useGetHistoryStream } from "@home-assistant-react/api/src/hooks/useGetHistoryStream";
import { distributeItems } from "@home-assistant-react/helpers/src/array/distributeItems";
import { useGetPanelDomSize } from "@home-assistant-react/hooks/src/useGetPanelDomSize";
import { Box } from "@home-assistant-react/ui/src";
import { LightLineChart } from "@home-assistant-react/ui/src/components/charts/LightLineChart";
import moment from "moment/moment";
import React from "react";
import { SensorPanel } from "../index";
import { SensorOptions } from "../types";

const defaultChartHeight = 40;

export const SensorChart: React.FC = () => {
  const { sidebar, panel } = usePanel();
  const options = panel?.options as SensorOptions | undefined;
  const { panelRect: panelSize } = useGetPanelDomSize();
  const historyEntity = options?.chartEntity || options?.entity_id || "";

  const updateInterval =
    (options?.chartUpdateInterval ??
      SensorPanel.defaultOptions!.chartUpdateInterval!) * 1000;

  const history = useGetHistoryStream(
    [historyEntity],
    moment()
      .subtract(
        options?.chartHistoryInterval ??
          SensorPanel.defaultOptions!.chartHistoryInterval,
        options?.chartHistoryIntervalType ??
          SensorPanel.defaultOptions!.chartHistoryIntervalType,
      )
      .toDate(),
    { refresh_interval: updateInterval },
  );

  const historyData = history?.states?.[historyEntity];

  const _data = (historyData || [])
    .filter((m) => m.s !== null && m.s !== undefined && !isNaN(Number(m.s)))
    .map((m) => ({ value: Number(m.s) }));

  const inSidebar = !!sidebar;
  if (!_data?.length) return null;

  const chartStyle = panel?.styles?.chart;

  return (
    <>
      <Box className={"absolute bottom-0 overflow-hidden"}>
        <LightLineChart
          width={panelSize?.width || 1}
          height={
            inSidebar || 0
              ? defaultChartHeight
              : (panelSize?.height || 1) / 2 || 0
          }
          data={distributeItems(_data, 15)}
          stroke={chartStyle?.stroke}
          fill={chartStyle?.fill}
        />
      </Box>

      {inSidebar && (
        <Box className={"w-full"} style={{ height: defaultChartHeight }}></Box>
      )}
    </>
  );
};
