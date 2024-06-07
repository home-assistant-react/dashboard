import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import { DEFAULT_GRID_COLS } from "@home-assistant-react/defines/src";
import {
  findAvailableSpotOnGrid,
  getStandardPanelSize,
  getUniqueId,
} from "@home-assistant-react/helpers/src";
import {
  AddPanelReturn,
  DashboardState,
  NewPanelData,
  PanelsGroup,
} from "@home-assistant-react/types/src";

export interface AddPanelOptions {
  panel: NewPanelData;
  callback?: (result: AddPanelReturn) => void;
  groupId?: string;
  viewId?: string;
  sidebarId?: string;
}

export const buildAddPanelState = (
  state: DashboardState,
  options: AddPanelOptions,
) => {
  const newState: DashboardState = { ...state };
  const { panel: panelData, sidebarId, groupId, viewId } = options;
  const view = viewId
    ? state.views.find((view) => view.id === viewId)
    : state.views[0];
  if (!view) throw new Error("View not found or no views available");

  const newPanelId = panelData.panelId || getUniqueId();
  const newPanel = {
    id: newPanelId,
    options: panelData.panelOptions,
    component: panelData.panelComponent,
    styles: panelData.styles || {},
  };

  let newGroup: PanelsGroup | undefined;
  let panelY = panelData.layoutInfo?.y || 0;
  let panelX = panelData.layoutInfo?.x || 0;

  if (!groupId) {
    if (
      view &&
      !sidebarId &&
      (panelData.layoutInfo?.y === undefined ||
        panelData.layoutInfo?.x === undefined)
    ) {
      const panelSize = getStandardPanelSize(panelData.panelComponent);
      const spot = findAvailableSpotOnGrid(
        view.layout,
        panelSize,
        view.gridOptions?.columns || DEFAULT_GRID_COLS,
      );
      panelY = spot.y || 0;
      panelX = spot.x || 0;
    }

    newGroup = {
      i: getUniqueId(),
      x: panelX,
      y: panelY,
      w: panelData.layoutInfo?.w || 4,
      h: panelData.layoutInfo?.h || 4,
      groupOptions: panelData.groupOptions,
      panels: [newPanelId],
    };
  }

  if (sidebarId) {
    newState.sidebars = state.sidebars.map((sidebar) => {
      if (panelData.sidebarId === sidebar.id) {
        if (groupId) {
          sidebar.groups = sidebar.groups.map((group) => {
            if (group.i === groupId) {
              return {
                ...group,
                panels: [...group.panels, newPanelId],
              };
            }
            return group;
          });
        }
        return {
          ...sidebar,
          groups: newGroup
            ? [...(sidebar.groups || []), newGroup]
            : sidebar.groups,
        };
      }
      return sidebar;
    });
  } else if (view && groupId) {
    const foundGroup = groupId
      ? view.layout.find((group) => group.i === groupId)
      : undefined;
    if (foundGroup) {
      view.layout = view.layout.map((group) => {
        if (group.i === groupId) {
          return {
            ...group,
            panels: [...group.panels, newPanelId],
          };
        }
        return group;
      });
    } else {
      for (const panelKey in newState.panels) {
        const panel = newState.panels[panelKey];
        if (panel.id === groupId) {
          const panelComponent = getPanelComponent(panel.component);
          if (panelComponent.isGroupPanel) {
            if (!panel.options) panel.options = {};
            if (!panel.options.panels || !Array.isArray(panel.options.panels))
              panel.options.panels = [];
            panel.options.panels.push(newPanelId);
          }

          newState.panels[panelKey] = panel;
        }
      }
    }
  } else if (newGroup) {
    view.layout = [
      ...(view.layout || []).map((layout) => {
        return {
          ...layout,
          y: layout.y + (layout.y >= panelY ? 1 : 0),
        };
      }),
      newGroup,
    ];
  }

  newState.views = state.views.map((_view) => {
    if (_view.id === view.id) {
      return {
        ..._view,
        layout: view.layout,
      };
    }
    return _view;
  });

  newState.panels = {
    ...state.panels,
    [String(newPanelId)]: newPanel,
  };

  options?.callback?.({ panel: newPanel, group: newGroup });
  return newState;
};
