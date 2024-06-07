import { CoverServices } from "./cover-services";
import { CoverState } from "@home-assistant-react/types/src";
import { useHass } from "../../hooks";

export function useCoverServices(state?: Partial<CoverState>) {
  const { connection } = useHass();
  return new CoverServices(connection, state);
}
