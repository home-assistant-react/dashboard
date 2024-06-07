import { ControlSliderProps } from "../../components";
import { LightState } from "@home-assistant-react/types/src";

export interface LightColorTemperatureSliderProps
  extends Partial<ControlSliderProps> {
  entity: LightState;
}
