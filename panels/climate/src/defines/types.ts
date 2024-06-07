import { UseClimateEntityReturn } from "@home-assistant-react/hooks/src/entities/useClimateEntity";

export interface ClimateOptions {
  entity_id: string;
}

export interface ClimatePanelState {
  climate: UseClimateEntityReturn | undefined;
}
