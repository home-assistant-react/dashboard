import { DashboardServices } from "./dashboard-services";
import { useHass } from "../../hooks";

export function useDashboardServices() {
  const { connection } = useHass();
  return new DashboardServices(connection);
}
