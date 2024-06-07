import { LightServices } from "./light-services";
import { LightState } from "@home-assistant-react/types/src";
import { useHass } from "../../hooks";

export function useLightServices(state?: Partial<LightState>) {
  const { connection } = useHass();
  return new LightServices(connection, state);
}
