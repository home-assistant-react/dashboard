import { PanelFC } from "@home-assistant-react/types/src";
import { Flex } from "@home-assistant-react/ui/src";
import { SensorPanel } from "../index";
import { SensorOptions } from "../types";
import { SensorChart } from "./SensorChart";
import { SensorComponent } from "./SensorComponent";
import { useSensorEntity } from "@home-assistant-react/hooks/src/entities/useSensorEntity";

export const Sensor: PanelFC<SensorOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const entity = useSensorEntity(entityId);

  const hasChart = options?.showChart ?? SensorPanel.defaultOptions!.showChart;

  return (
    <Flex className={["w-full", !hasChart ? "h-full" : "pt-2"]}>
      <SensorComponent entity={entity} />
      {hasChart && <SensorChart />}
    </Flex>
  );
};
