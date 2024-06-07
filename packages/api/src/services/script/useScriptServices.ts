import { ScriptServices } from "./script-services";
import { ScriptState } from "@home-assistant-react/types/src";
import { useHass } from "../../hooks";

export function useScriptServices(state?: Partial<ScriptState>) {
  const { connection } = useHass();
  return new ScriptServices(connection, state);
}
