import { IconValue } from "@home-assistant-react/ui/src";
import {
  mdiArrowUpBox,
  mdiArrowDownBox,
  mdiGarage,
  mdiGarageOpen,
  mdiGateArrowRight,
  mdiGate,
  mdiGateOpen,
  mdiDoorOpen,
  mdiDoorClosed,
  mdiCircle,
  mdiWindowShutter,
  mdiWindowShutterOpen,
  mdiBlindsHorizontal,
  mdiBlindsHorizontalClosed,
  mdiRollerShade,
  mdiRollerShadeClosed,
  mdiWindowClosed,
  mdiWindowOpen,
  mdiArrowExpandHorizontal,
  mdiArrowUp,
  mdiArrowCollapseHorizontal,
  mdiArrowDown,
  mdiCircleSlice8,
  mdiArrowSplitVertical,
  mdiCurtains,
  mdiCurtainsClosed,
  mdiStop,
  mdiArrowTopRight,
  mdiArrowBottomLeft,
  mdiBrightness6,
  mdiWindowShutterSettings,
} from "@mdi/js";
import { HassEntityState } from "@home-assistant-react/types/src";

export const getCoverIcon = (
  state?: string,
  stateObj?: HassEntityState,
  customIcons?: { [key: string]: string },
): string | IconValue => {
  const open = state !== "closed";
  let _state = state;
  if (_state !== "closed" && _state !== "opening" && _state !== "closing") {
    _state = "open";
  }

  if (customIcons?.[`icon_${_state}`]) {
    return customIcons?.[`icon_${_state}`];
  }

  switch (stateObj?.attributes.device_class) {
    case "garage":
      switch (state) {
        case "opening":
          return mdiArrowUpBox;
        case "closing":
          return mdiArrowDownBox;
        case "closed":
          return mdiGarage;
        default:
          return mdiGarageOpen;
      }
    case "gate":
      switch (state) {
        case "opening":
        case "closing":
          return mdiGateArrowRight;
        case "closed":
          return mdiGate;
        default:
          return mdiGateOpen;
      }
    case "door":
      return open ? mdiDoorOpen : mdiDoorClosed;
    case "damper":
      return open ? mdiCircle : mdiCircleSlice8;
    case "shutter":
      switch (state) {
        case "opening":
          return mdiArrowUpBox;
        case "closing":
          return mdiArrowDownBox;
        case "closed":
          return mdiWindowShutter;
        default:
          return mdiWindowShutterOpen;
      }
    case "curtain":
      switch (state) {
        case "opening":
          return mdiArrowSplitVertical;
        case "closing":
          return mdiArrowCollapseHorizontal;
        case "closed":
          return mdiCurtainsClosed;
        default:
          return mdiCurtains;
      }
    case "blind":
      switch (state) {
        case "opening":
          return mdiArrowUpBox;
        case "closing":
          return mdiArrowDownBox;
        case "closed":
          return mdiBlindsHorizontalClosed;
        default:
          return mdiBlindsHorizontal;
      }
    case "shade":
      switch (state) {
        case "opening":
          return mdiArrowUpBox;
        case "closing":
          return mdiArrowDownBox;
        case "closed":
          return mdiRollerShadeClosed;
        default:
          return mdiRollerShade;
      }
    case "window":
      switch (state) {
        case "opening":
          return mdiArrowUpBox;
        case "closing":
          return mdiArrowDownBox;
        case "closed":
          return mdiWindowClosed;
        default:
          return mdiWindowOpen;
      }
  }

  switch (state) {
    case "opening":
      return mdiArrowUpBox;
    case "closing":
      return mdiArrowDownBox;
    case "closed":
      return mdiWindowClosed;
    default:
      return mdiWindowOpen;
  }
};

export const getCoverOpenIcon = (stateObj: HassEntityState): string => {
  switch (stateObj.attributes.device_class) {
    case "awning":
    case "door":
    case "gate":
    case "curtain":
      return mdiArrowExpandHorizontal;
    default:
      return mdiArrowUp;
  }
};

export const getCoverCloseIcon = (stateObj: HassEntityState): string => {
  switch (stateObj.attributes.device_class) {
    case "awning":
    case "door":
    case "gate":
    case "curtain":
      return mdiArrowCollapseHorizontal;
    default:
      return mdiArrowDown;
  }
};

export const COVER_DEFAULT_STOP_ICON = mdiStop;
export const COVER_DEFAULT_OPEN_TILT_ICON = mdiArrowTopRight;
export const COVER_DEFAULT_CLOSE_TILT_ICON = mdiArrowBottomLeft;
export const COVER_DEFAULT_HALF_ICON = mdiBrightness6;
export const COVER_DEFAULT_GLIMMER_ICON = mdiWindowShutterSettings;
