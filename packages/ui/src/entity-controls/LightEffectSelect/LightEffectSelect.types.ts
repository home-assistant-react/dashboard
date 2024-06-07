import { SelectProps } from "../../components";
import { LightState } from "@home-assistant-react/types/src";

export interface LightEffectSelectProps extends Partial<SelectProps> {
  entity: LightState;
}
