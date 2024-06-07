import { DashboardState } from "@home-assistant-react/types/src";
import { v4 as uuidv4 } from "uuid";

export function getNewDashboardObject(
  options: Partial<DashboardState>,
): DashboardState {
  const currentDatetime = new Date().toISOString();

  return {
    id: options.id || uuidv4(),
    name: options.name || "",
    description: options.description || "",
    createdAt: currentDatetime,
    updatedAt: "",
    layout: [],
    views: [{ id: uuidv4(), name: "Home", layout: [], order: 0 }],
    sidebars: [],
    panels: {},
    settings: {},
    ...options,
  };
}

export function validateDashboardObject(dashboard: DashboardState) {
  //TODO - Validate dashboard state
  return !!dashboard;
}
