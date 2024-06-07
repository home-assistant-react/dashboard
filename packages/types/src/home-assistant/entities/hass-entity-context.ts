import { Nullable } from "../../helpers";

export interface HassEntityContext {
  id: string;
  parent_id: Nullable<string>;
  user_id: Nullable<string>;
}
