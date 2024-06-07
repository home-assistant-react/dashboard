import { HassEntityState } from "@home-assistant-react/types/src";
import slugify from "slugify";
import { getDomainFromEntityId } from "./entities";
import { getStateActive } from "./get-state-active";

const STATE_COLORED_DOMAIN = new Set([
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "group",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "schedule",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
]);

export const batteryStateColorProperty = (
  state: string,
): string | undefined => {
  const value = Number(state);
  if (isNaN(value)) {
    return undefined;
  }
  if (value >= 70) {
    return "--state-sensor-battery-high-color";
  }
  if (value >= 30) {
    return "--state-sensor-battery-medium-color";
  }
  return "--state-sensor-battery-low-color";
};

export const domainStateColorProperties = (
  domain: string,
  stateObj: HassEntityState,
  state?: string,
): string[] => {
  const compareState = state !== undefined ? state : stateObj.state;
  const active = getStateActive(stateObj, state);

  const properties: string[] = [];

  const stateKey = slugify(compareState);
  const activeKey = active ? "active" : "inactive";

  const dc = stateObj.attributes.device_class;

  if (dc) {
    properties.push(`--state-${domain}-${dc}-${stateKey}-color`);
  }

  properties.push(
    `--state-${domain}-${stateKey}-color`,
    `--state-${domain}-${activeKey}-color`,
    `--state-${activeKey}-color`,
  );

  return properties;
};

export const computeStateColorProperties = (
  stateObj: HassEntityState,
  state?: string,
): string[] | undefined => {
  const compareState = state !== undefined ? state : stateObj?.state;
  const domain = getDomainFromEntityId(stateObj.entity_id);
  const dc = stateObj.attributes.device_class;

  // Special rules for battery coloring
  if (domain === "sensor" && dc === "battery") {
    const property = batteryStateColorProperty(compareState);
    if (property) {
      return [property];
    }
  }

  if (STATE_COLORED_DOMAIN.has(domain)) {
    return domainStateColorProperties(domain, stateObj, state);
  }

  return undefined;
};

export const stateColorBrightness = (stateObj: HassEntityState): string => {
  if (
    stateObj.attributes.brightness &&
    getDomainFromEntityId(stateObj.entity_id) !== "plant"
  ) {
    // lowest brightness will be around 50% (that's pretty dark)
    const brightness = stateObj.attributes.brightness;
    return `brightness(${(brightness + 245) / 5}%)`;
  }
  return "";
};
