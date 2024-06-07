import { DashboardState } from "@home-assistant-react/types/src";

/**
 * Retrieves a panel from the dashboard state using a specified panel ID.
 *
 * @param dashboardState - The current state of the dashboard containing all panels.
 * @param panelId - The ID of the panel to retrieve.
 * @returns The panel corresponding to the provided panel ID, or `undefined` if the panel does not exist.
 *
 * @example
 * // Example usage:
 * const dashboardState = {
 *   panels: {
 *     panel1: { id: 'panel1', content: 'Panel 1 content' },
 *     panel2: { id: 'panel2', content: 'Panel 2 content' },
 *   },
 * };
 * const panel = getPanelFromDashboardState(dashboardState, 'panel1');
 * console.log(panel); // Outputs: { id: 'panel1', content: 'Panel 1 content' }
 */
export const getPanelFromDashboardState = (
  dashboardState: DashboardState,
  panelId: string,
) => {
  return dashboardState.panels[panelId] || undefined;
};
