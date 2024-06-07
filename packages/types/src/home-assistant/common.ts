export const ENTITY_UNAVAILABLE = "unavailable";
export const ENTITY_UNKNOWN = "unknown";
export const ENTITY_ON = "on";
export const ENTITY_OFF = "off";

export const ENTITY_UNAVAILABLE_STATES = [
  ENTITY_UNAVAILABLE,
  ENTITY_UNKNOWN,
] as const;
export const ENTITY_OFF_STATES = [
  ENTITY_UNAVAILABLE,
  ENTITY_UNKNOWN,
  ENTITY_OFF,
] as const;
