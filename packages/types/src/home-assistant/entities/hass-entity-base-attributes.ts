export type HassEntityBaseAttributes = Record<string, unknown> & {
  device_class?: string;
  friendly_name?: string;
};
