import { HassEntityState } from "@home-assistant-react/types/src";
import { ToggleServices } from "./toggle-services";
import { useHass } from "../../hooks";

export function useToggleServices(state?: Partial<HassEntityState>) {
  const { connection } = useHass();
  return new ToggleServices(connection, state);
}
