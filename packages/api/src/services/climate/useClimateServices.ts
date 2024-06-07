import { ClimateServices } from "./climate-services";
import { ClimateState } from "@home-assistant-react/types/src";
import { useHass } from "../../hooks";

export function useClimateServices(state?: Partial<ClimateState>) {
  const { connection } = useHass();
  return new ClimateServices(connection, state);
}
