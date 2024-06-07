import { supportsFeatureFromAttributes } from "./supports-feature-from-attributes";
import { HassEntityState } from "@home-assistant-react/types/src";

export const supportsFeature = (
  stateObj: HassEntityState<unknown>,
  feature: number,
): boolean => supportsFeatureFromAttributes(stateObj.attributes, feature);
