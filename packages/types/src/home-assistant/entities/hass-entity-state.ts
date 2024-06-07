import { HassArea } from "../area";
import { HassEntityInfo } from "./hass-entity-info";
import { HassEntityBaseAttributes } from "./hass-entity-base-attributes";
import { HassEntityContext } from "./hass-entity-context";

export interface HassEntityState<T = HassEntityBaseAttributes> {
  attributes: HassEntityBaseAttributes & T;
  context: HassEntityContext;
  entity_id: string;
  last_changed: string;
  last_updated: string;
  state: string;
  area?: HassArea;
  info?: HassEntityInfo;
  domain?: string;
}

export type HassEntitiesState<T = object> = Record<string, HassEntityState<T>>;
