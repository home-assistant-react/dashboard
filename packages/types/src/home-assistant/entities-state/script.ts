import { HassEntityState } from "../entities";

export interface HassScriptEntityAttributes {
  mode: "single" | "restart" | "queued" | "parallel";
  last_triggered: string;
  icon: string;
  current: number;
}

export type ScriptState = HassEntityState<HassScriptEntityAttributes>;
