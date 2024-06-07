import {
  useHassGetEntity,
  UseHassGetEntityReturn,
} from "@home-assistant-react/api/src";
import {
  ScriptServices,
  useScriptServices,
} from "@home-assistant-react/api/src/services/script";
import { HassScriptEntityAttributes } from "../../../types/src";

export interface UseScriptEntityReturn
  extends UseHassGetEntityReturn<HassScriptEntityAttributes> {
  start: ScriptServices["turnOn"];
  stop: ScriptServices["turnOff"];
}

export const useScriptEntity = <T extends HassScriptEntityAttributes>(
  entityId: string,
): UseScriptEntityReturn | undefined => {
  const scriptEntity = useHassGetEntity<T>(entityId);
  const scriptServices = useScriptServices({ entity_id: entityId });
  if (!scriptEntity) return undefined;
  return {
    ...scriptEntity,
    start: scriptServices.turnOn.bind(scriptServices),
    stop: scriptServices.turnOff.bind(scriptServices),
  };
};
