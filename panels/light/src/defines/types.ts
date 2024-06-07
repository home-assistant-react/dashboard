import { LightServices } from "@home-assistant-react/api/src/services/light";
import {
  LightState,
  UseDisclosureReturn,
} from "@home-assistant-react/types/src";

export interface LightOptions {
  entity_id: string;
  sliderOnPanel?: boolean;
  showToggle?: boolean;
  showStatus?: boolean;
}

export interface LightPanelState {
  lightEntity: LightState;
  isLightOn: boolean;
  options?: LightOptions;
  moreModalDisclosure: UseDisclosureReturn;
  hasBrightnessControl: boolean;
  hasSliderOnPanel: boolean;
  brightness: number;
  light: LightServices;
}
