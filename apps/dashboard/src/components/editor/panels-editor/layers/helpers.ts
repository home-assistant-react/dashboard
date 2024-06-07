import { DashboardState, PanelsGroup } from "@home-assistant-react/types/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src/panels/getPanelFromDashboardState";
import { LayerData } from "@home-assistant-react/types/src/editor/layer-data";

export function getPanelLayerItems(
  dashboard: DashboardState,
  group: PanelsGroup,
  groupId: string,
  outputArray: LayerData[] = [],
  depth = 1,
) {
  const output = outputArray || [];

  const getDeepPanels = (panels: string[], depth: number) => {
    panels.forEach((panelId) => {
      const panel = getPanelFromDashboardState(dashboard, panelId);
      if (panel) {
        output.push({ panel, depth, groupId });
        if (panel.options?.panels) {
          getDeepPanels(panel.options?.panels, depth + 1);
        }
      }
    });
  };
  getDeepPanels(group.panels, depth);

  return output;
}
