import { HassEntityState } from "../entities";

export const enum CoverEntityFeature {
  OPEN = 1,
  CLOSE = 2,
  SET_POSITION = 4,
  STOP = 8,
  OPEN_TILT = 16,
  CLOSE_TILT = 32,
  STOP_TILT = 64,
  SET_TILT_POSITION = 128,
}
export interface HassCoverEntityAttributes {
  current_position?: number;
  position?: number;
}

export type CoverButton =
  | "open"
  | "close"
  | "stop"
  | "open-tilt"
  | "close-tilt"
  | "none"
  | "glimmer"
  | "half";

export type CoverLayout = {
  type: "line" | "cross";
  buttons: CoverButton[];
};

export type CoverState = HassEntityState<HassCoverEntityAttributes>;
