import { useHassGetEntitiesOnce } from "@home-assistant-react/api/src";
import { getRandomObjectValue } from "@home-assistant-react/helpers/src";
import { HassEntityState } from "@home-assistant-react/types/src";
import React from "react";
import { SensorComponent } from "./SensorComponent";

export const SensorPreviewPanel: React.FC = () => {
  const entities = useHassGetEntitiesOnce({ domain: "sensor" });
  const randomEntity = entities
    ? getRandomObjectValue<HassEntityState>(entities)
    : undefined;

  return (
    <SensorComponent
      entity={
        randomEntity ||
        ({
          attributes: { friendly_name: "" },
        } as HassEntityState<unknown>)
      }
    />
  );
};
