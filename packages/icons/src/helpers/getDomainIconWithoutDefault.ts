import { IconValue } from "@home-assistant-react/ui/src";
import {
  mdiAccount,
  mdiAccountArrowRight,
  mdiAirHumidifier,
  mdiAirHumidifierOff,
  mdiAudioVideo,
  mdiAudioVideoOff,
  mdiBluetooth,
  mdiBluetoothConnect,
  mdiButtonPointer,
  mdiCalendar,
  mdiCast,
  mdiCastConnected,
  mdiCastOff,
  mdiChartSankey,
  mdiCheckCircleOutline,
  mdiClock,
  mdiCloseCircleOutline,
  mdiCrosshairsQuestion,
  mdiDoorbell,
  mdiEyeCheck,
  mdiFan,
  mdiFanOff,
  mdiGestureTapButton,
  mdiLanConnect,
  mdiLanDisconnect,
  mdiLock,
  mdiLockAlert,
  mdiLockClock,
  mdiLockOpen,
  mdiMotionSensor,
  mdiPackageUp,
  mdiPowerPlug,
  mdiPowerPlugOff,
  mdiRestart,
  mdiRobot,
  mdiRobotConfused,
  mdiRobotOff,
  mdiSpeaker,
  mdiSpeakerOff,
  mdiSpeakerPause,
  mdiSpeakerPlay,
  mdiSwapHorizontal,
  mdiTelevision,
  mdiTelevisionOff,
  mdiTelevisionPause,
  mdiTelevisionPlay,
  mdiToggleSwitchVariant,
  mdiToggleSwitchVariantOff,
  mdiVideo,
  mdiVideoOff,
  mdiWaterBoiler,
  mdiWaterBoilerOff,
  mdiWeatherNight,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import {
  getAlarmPanelIcon,
  getBinarySensorIcon,
  getCoverIcon,
  getNumberIcon,
  getWeatherIcon,
} from "../entities";
import { HassEntityState } from "@home-assistant-react/types/src";
import { getSensorIcon } from "./getSensorIcon";
import { FIXED_DOMAIN_ICONS } from "../defines";

export const getDomainIconWithoutDefault = (
  domain: string,
  stateObj?: HassEntityState,
  state?: string,
): IconValue | string | undefined => {
  const compareState = state !== undefined ? state : stateObj?.state;

  switch (domain) {
    case "alarm_control_panel":
      return getAlarmPanelIcon(compareState);

    case "automation":
      return compareState === "unavailable"
        ? mdiRobotConfused
        : compareState === "off"
          ? mdiRobotOff
          : mdiRobot;

    case "binary_sensor":
      return getBinarySensorIcon(compareState, stateObj);

    case "button":
      switch (stateObj?.attributes.device_class) {
        case "identify":
          return mdiCrosshairsQuestion;
        case "restart":
          return mdiRestart;
        case "update":
          return mdiPackageUp;
        default:
          return mdiButtonPointer;
      }

    case "camera":
      return compareState === "off" ? mdiVideoOff : mdiVideo;

    case "cover":
      return getCoverIcon(compareState, stateObj);

    case "device_tracker":
      if (stateObj?.attributes.source_type === "router") {
        return compareState === "home" ? mdiLanConnect : mdiLanDisconnect;
      }
      if (
        ["bluetooth", "bluetooth_le"].includes(stateObj?.attributes.source_type)
      ) {
        return compareState === "home" ? mdiBluetoothConnect : mdiBluetooth;
      }
      return compareState === "not_home" ? mdiAccountArrowRight : mdiAccount;

    case "event":
      switch (stateObj?.attributes.device_class) {
        case "doorbell":
          return mdiDoorbell;
        case "button":
          return mdiGestureTapButton;
        case "motion":
          return mdiMotionSensor;
        default:
          return mdiEyeCheck;
      }

    case "fan":
      return compareState === "off" ? mdiFanOff : mdiFan;

    case "humidifier":
      return compareState === "off" ? mdiAirHumidifierOff : mdiAirHumidifier;

    case "input_boolean":
      return compareState === "on"
        ? mdiCheckCircleOutline
        : mdiCloseCircleOutline;

    case "input_datetime":
      if (!stateObj?.attributes.has_date) {
        return mdiClock;
      }
      if (!stateObj.attributes.has_time) {
        return mdiCalendar;
      }
      break;

    case "lock":
      switch (compareState) {
        case "unlocked":
          return mdiLockOpen;
        case "jammed":
          return mdiLockAlert;
        case "locking":
        case "unlocking":
          return mdiLockClock;
        default:
          return mdiLock;
      }

    case "media_player":
      switch (stateObj?.attributes.device_class) {
        case "speaker":
          switch (compareState) {
            case "playing":
              return mdiSpeakerPlay;
            case "paused":
              return mdiSpeakerPause;
            case "off":
              return mdiSpeakerOff;
            default:
              return mdiSpeaker;
          }
        case "tv":
          switch (compareState) {
            case "playing":
              return mdiTelevisionPlay;
            case "paused":
              return mdiTelevisionPause;
            case "off":
              return mdiTelevisionOff;
            default:
              return mdiTelevision;
          }
        case "receiver":
          switch (compareState) {
            case "off":
              return mdiAudioVideoOff;
            default:
              return mdiAudioVideo;
          }
        default:
          switch (compareState) {
            case "playing":
            case "paused":
              return mdiCastConnected;
            case "off":
              return mdiCastOff;
            default:
              return mdiCast;
          }
      }

    case "number": {
      const icon = getNumberIcon(stateObj);
      if (icon) {
        return icon;
      }

      break;
    }

    case "person":
      return compareState === "not_home" ? mdiAccountArrowRight : mdiAccount;

    case "switch":
      switch (stateObj?.attributes.device_class) {
        case "outlet":
          return compareState === "on" ? mdiPowerPlug : mdiPowerPlugOff;
        case "switch":
          return compareState === "on"
            ? mdiToggleSwitchVariant
            : mdiToggleSwitchVariantOff;
        default:
          return mdiToggleSwitchVariant;
      }

    case "sensor": {
      const icon = getSensorIcon(stateObj);
      if (icon) {
        return icon;
      }

      break;
    }

    case "sun":
      return stateObj?.state === "above_horizon"
        ? mdiWhiteBalanceSunny
        : mdiWeatherNight;

    case "switch_as_x":
      return mdiSwapHorizontal;

    case "threshold":
      return mdiChartSankey;

    case "water_heater":
      return compareState === "off" ? mdiWaterBoilerOff : mdiWaterBoiler;

    case "weather":
      return getWeatherIcon(stateObj?.state);
  }

  if (domain in FIXED_DOMAIN_ICONS) {
    return FIXED_DOMAIN_ICONS[domain as keyof typeof FIXED_DOMAIN_ICONS];
  }

  return undefined;
};
