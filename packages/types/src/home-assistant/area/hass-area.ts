import { Nullable } from "../../helpers";

export interface HassArea {
  area_id: Nullable<string>;
  name: Nullable<string>;
  picture: Nullable<string>;
}

export type HassAreas = Record<string, HassArea>;
