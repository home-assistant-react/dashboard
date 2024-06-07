import { UseSensorEntityReturn } from "@home-assistant-react/hooks/src/entities/useSensorEntity";

export interface SensorOptions {
  entity_id: string;
}

export interface SensorPanelState {
  sensor: UseSensorEntityReturn | undefined;
}
