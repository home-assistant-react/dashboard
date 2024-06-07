import { LightState } from "@home-assistant-react/types/src";
import { ControlSliderProps } from "../../components";

export interface LightBrightnessSliderProps
  extends Partial<ControlSliderProps> {
  entity: LightState;
}
