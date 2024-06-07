import {
  CoverButton,
  CoverEntityFeature,
  CoverLayout,
  CoverState,
  ENTITY_UNAVAILABLE,
} from "@home-assistant-react/types/src";
import { supportsFeature } from "../supports-feature";

export const getCoverLayoutInfo = (stateObj: CoverState): CoverLayout => {
  const supportsOpen = supportsFeature(stateObj, CoverEntityFeature.OPEN);
  const supportsClose = supportsFeature(stateObj, CoverEntityFeature.CLOSE);
  const supportsStop = supportsFeature(stateObj, CoverEntityFeature.STOP);
  const supportsOpenTilt = supportsFeature(
    stateObj,
    CoverEntityFeature.OPEN_TILT,
  );
  const supportsCloseTilt = supportsFeature(
    stateObj,
    CoverEntityFeature.CLOSE_TILT,
  );
  const supportsStopTilt = supportsFeature(
    stateObj,
    CoverEntityFeature.STOP_TILT,
  );

  if (
    (supportsOpen || supportsClose) &&
    (supportsOpenTilt || supportsCloseTilt)
  ) {
    return {
      type: "cross",
      buttons: [
        supportsOpen ? "open" : "none",
        supportsCloseTilt ? "close-tilt" : "none",
        supportsStop || supportsStopTilt ? "stop" : "none",
        supportsOpenTilt ? "open-tilt" : "none",
        supportsClose ? "close" : "none",
      ],
    };
  }

  if (supportsOpen || supportsClose) {
    const buttons: CoverButton[] = [];
    if (supportsOpen) buttons.push("open");
    if (supportsStop) buttons.push("stop");
    if (supportsClose) buttons.push("close");
    return {
      type: "line",
      buttons,
    };
  }

  if (supportsOpenTilt || supportsCloseTilt) {
    const buttons: CoverButton[] = [];
    if (supportsOpenTilt) buttons.push("open-tilt");
    if (supportsStopTilt) buttons.push("stop");
    if (supportsCloseTilt) buttons.push("close-tilt");
    return {
      type: "line",
      buttons,
    };
  }

  return {
    type: "line",
    buttons: [],
  };
};

export function isCoverFullyOpen(stateObj: CoverState) {
  if (stateObj.attributes.current_position !== undefined) {
    return stateObj.attributes.current_position === 100;
  }
  return stateObj.state === "open";
}

export function isCoverFullyClosed(stateObj: CoverState) {
  if (stateObj.attributes.current_position !== undefined) {
    return stateObj.attributes.current_position === 0;
  }
  return stateObj.state === "closed";
}

export function isCoverFullyOpenTilt(stateObj: CoverState) {
  return stateObj.attributes.current_tilt_position === 100;
}

export function isCoverFullyClosedTilt(stateObj: CoverState) {
  return stateObj.attributes.current_tilt_position === 0;
}

export function isCoverOpening(stateObj: CoverState) {
  return stateObj.state === "opening";
}

export function isCoverClosing(stateObj: CoverState) {
  return stateObj.state === "closing";
}

export function isCoverTiltOnly(stateObj: CoverState) {
  const supportsCover =
    supportsFeature(stateObj, CoverEntityFeature.OPEN) ||
    supportsFeature(stateObj, CoverEntityFeature.CLOSE) ||
    supportsFeature(stateObj, CoverEntityFeature.STOP);
  const supportsTilt =
    supportsFeature(stateObj, CoverEntityFeature.OPEN_TILT) ||
    supportsFeature(stateObj, CoverEntityFeature.CLOSE_TILT) ||
    supportsFeature(stateObj, CoverEntityFeature.STOP_TILT);
  return supportsTilt && !supportsCover;
}

export function coverCanOpen(stateObj: CoverState) {
  if (stateObj.state === ENTITY_UNAVAILABLE) {
    return false;
  }
  const assumedState = stateObj.attributes.assumed_state === true;
  return (
    (!isCoverFullyOpen(stateObj) && !isCoverOpening(stateObj)) || assumedState
  );
}

export function coverCanClose(stateObj: CoverState): boolean {
  if (stateObj.state === ENTITY_UNAVAILABLE) {
    return false;
  }
  const assumedState = stateObj.attributes.assumed_state === true;
  return (
    (!isCoverFullyClosed(stateObj) && !isCoverClosing(stateObj)) || assumedState
  );
}

export function coverCanStop(stateObj: CoverState): boolean {
  return stateObj.state !== ENTITY_UNAVAILABLE;
}

export function coverCanOpenTilt(stateObj: CoverState): boolean {
  if (stateObj.state === ENTITY_UNAVAILABLE) {
    return false;
  }
  const assumedState = stateObj.attributes.assumed_state === true;
  return !isCoverFullyOpenTilt(stateObj) || assumedState;
}

export function coverCanCloseTilt(stateObj: CoverState): boolean {
  if (stateObj.state === ENTITY_UNAVAILABLE) {
    return false;
  }
  const assumedState = stateObj.attributes.assumed_state === true;
  return !isCoverFullyClosedTilt(stateObj) || assumedState;
}

export function coverCanStopTilt(stateObj: CoverState): boolean {
  return stateObj.state !== ENTITY_UNAVAILABLE;
}
