import { HassConfigUnitSystem } from "./hass-config-unit-system";
import { HassState } from "./hass-state";

export type HassConfig = {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: HassConfigUnitSystem;
  location_name: string;
  time_zone: string;
  components: string[];
  config_dir: string;
  allowlist_external_dirs: string[];
  allowlist_external_urls: string[];
  version: string;
  config_source: string;
  safe_mode: boolean;
  state: HassState;
  external_url: string | null;
  internal_url: string | null;
  currency: string;
  country: string | null;
  language: string;
};
