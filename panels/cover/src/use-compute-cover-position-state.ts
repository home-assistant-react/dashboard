import {
  CoverState,
  FrontendLocaleData,
} from "@home-assistant-react/types/src";
import { getStateActive } from "@home-assistant-react/helpers/src/home-assistant";
import { getBlankBeforePercent } from "@home-assistant-react/helpers/src/locale/getBlankBeforePercent";

export function useComputeCoverPositionState(
  stateObj: CoverState,
  options?: {
    locale: FrontendLocaleData;
    position?: number;
  },
) {
  const statePosition = getStateActive(stateObj)
    ? stateObj.attributes.current_position ??
      stateObj.attributes.current_tilt_position
    : undefined;

  const currentPosition = options?.position ?? statePosition;

  return currentPosition && currentPosition !== 100
    ? `${Math.round(currentPosition)}${
        options?.locale ? getBlankBeforePercent(options?.locale) : ""
      }%`
    : "";
}
