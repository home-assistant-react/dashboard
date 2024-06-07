import { ColorWheelProps } from "../../components";
import { LightState } from "@home-assistant-react/types/src";

export interface LightColorSelectProps extends Partial<ColorWheelProps> {
  entity: LightState;
}
