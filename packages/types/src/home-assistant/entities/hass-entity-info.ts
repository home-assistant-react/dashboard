import { Nullable } from "../../helpers";

export interface HassEntityInfo {
  area_id: Nullable<string>;
  config_entity_id: Nullable<string>;
  device_id: Nullable<string>;
  disabled_by: Nullable<string>;
  entity_category: Nullable<string>;
  entity_id: Nullable<string>;
  has_entity_name: boolean;
  hidden_by: Nullable<string>;
  icon: Nullable<string>;
  id: Nullable<string>;
  name: Nullable<string>;
  original_name: Nullable<string>;
  platform: Nullable<string>;
  unique_id: Nullable<string>;
}

export type HassEntitiesInfo = Record<string, HassEntityInfo>;
