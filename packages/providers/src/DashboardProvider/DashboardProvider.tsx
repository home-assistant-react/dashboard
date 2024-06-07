import React from "react";
import {
  DashboardState,
  DashboardStateWithMethods,
  DashboardView,
  defaultDashboardOptions,
  NewPanelData,
  Panel,
  PanelsGroup,
  PanelsGroupOptions,
  Sidebar,
  ThemeStyles,
  UpdateGroupOptionsOptions,
} from "@home-assistant-react/types/src";
import {
  getObjectKeys,
  getUniqueId,
  logError,
} from "@home-assistant-react/helpers/src";
import { DashboardProviderProps } from "./DashboardProvider.types";
import { CloudIntegrations } from "@home-assistant-react/types/src/api";
import { useApi, useHass } from "@home-assistant-react/api/src";
import { AddPanelOptions, buildAddPanelState } from "./helpers";

export const DashboardContext =
  React.createContext<DashboardStateWithMethods | null>(null);

export const DashboardProvider: React.FC<
  React.PropsWithChildren<DashboardProviderProps>
> = ({ children, initialState }) => {
  //const [messages, setMessages] = React.useState<Record<string, string>>({});
  const api = useApi();
  const hass = useHass();
  const selectedDashboard = hass.selectedDashboard || "";
  const [selectedDashboardView, setSelectedDashboardView] = React.useState<
    string | null
  >(initialState?.views?.[0]?.id || null);

  /*const defaultGridOptions = {
    rowsHeight: DEFAULT_GRID_ROWS_HEIGHT,
  };*/

  const [state, updateState] = React.useState<DashboardState>({
    views: [],
    layout: [],
    panels: {},
    sidebars: [],
    settings: defaultDashboardOptions,
    ...initialState,
    // gridOptions: {
    //   ...defaultGridOptions,
    //   ...initialState?.gridOptions,
    // },
  });

  const [integrations, setIntegrations] = React.useState<
    CloudIntegrations["integrations"]
  >([]);

  const _updateState = async (state: DashboardState) => {
    updateState(state);
    await api.updateDashboard(selectedDashboard, state);
  };

  const handleAddPanel = (options: AddPanelOptions) => {
    updateState((state) => {
      const newState = buildAddPanelState(state, options);
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const addPanel: DashboardStateWithMethods["addPanel"] = async (
    panelData: NewPanelData,
    callback,
  ) => {
    handleAddPanel({
      sidebarId: panelData.sidebarId,
      groupId: panelData.targetId,
      viewId: panelData.viewId,
      panel: panelData,
      callback,
    });
  };

  const updatePanel = (panel: Panel) => {
    updateState((state) => {
      const newState = {
        ...state,
        panels: {
          ...state.panels,
          [panel.id]: panel,
        },
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const updateThemeOptions = async (theme: ThemeStyles[]) => {
    updateState((state) => {
      const newState = {
        ...state,
        theme,
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const updateGroupOptions = async (
    group: PanelsGroup,
    groupOptions: PanelsGroupOptions,
    options?: UpdateGroupOptionsOptions,
  ) => {
    if (options?.sidebarId) {
      updateState((state) => {
        const newState: DashboardState = {
          ...state,
          sidebars: state.sidebars.map((sidebar) => {
            if (sidebar.id === options.sidebarId) {
              return {
                ...sidebar,
                groups: sidebar.groups.map((_group) => {
                  if (_group.i === group.i) {
                    return {
                      ..._group,
                      groupOptions,
                    };
                  }
                  return _group;
                }),
              };
            }
            return sidebar;
          }),
        };
        api.updateDashboard(selectedDashboard, newState);
        return newState;
      });

      return;
    }

    const view = state.views.find((view) => view.id === options?.viewId);
    if (!view) throw new Error("View not found or no views available");

    updateState((state) => {
      const newState: DashboardState = {
        ...state,
        views: state.views.map((v) => {
          if (v.id !== view.id) return v;
          return {
            ...v,
            layout: v.layout.map((layout) => {
              if (layout.i !== group.i) return layout;
              return {
                ...layout,
                groupOptions,
              };
            }),
          };
        }),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deletePanel = (viewId: string, panel: Panel) => {
    const view = {
      ...(viewId
        ? state.views.find((view) => view.id === viewId)
        : state.views[0]),
    };

    if (!view) throw new Error("View not found or no views available");

    updateState((state) => {
      const newState: DashboardState = { ...state, panels: {}, views: [] };
      getObjectKeys(state.panels).forEach((key) => {
        if (key !== panel.id) {
          const subPanel = state.panels[key];
          if (subPanel.options && Array.isArray(subPanel.options.panels)) {
            subPanel.options.panels = subPanel.options.panels.filter(
              (panelId: string) => panelId !== panel.id,
            );
          }
          newState.panels[key] = subPanel;
        }
      });

      //TODO need to fix for deep delete
      newState.views = state.views.map((v) => {
        if (v.id !== view.id) return v;
        return {
          ...v,
          layout: v.layout
            .map((group) => {
              return {
                ...group,
                panels: group.panels.filter((panelId) => panelId !== panel.id),
              };
            })
            .filter((group) => group.panels.length > 0),
        };
      });
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deletePanelFromSidebar = (panel: Panel, sidebarId: string) => {
    updateState((state) => {
      const sidebar = state.sidebars.find(
        (sidebar) => sidebar.id === sidebarId,
      );
      if (!sidebar) return state;
      const newState: DashboardState = {
        ...state,
        panels: {},
        sidebars: [
          ...state.sidebars.map((sidebar) => {
            const newSidebar: Sidebar = { ...sidebar, groups: [] };
            sidebar.groups.forEach((group) => {
              const newGroup: PanelsGroup = { ...group, panels: [] };
              group.panels.forEach((panelId) => {
                if (panelId !== panel.id) {
                  newGroup.panels.push(panelId);
                }
              });
              if (newGroup.panels.length > 0) newSidebar.groups.push(newGroup);
            });
            return newSidebar;
          }),
        ],
      };
      getObjectKeys(state.panels).forEach((key) => {
        if (key !== panel.id) {
          const subPanel = state.panels[key];
          if (subPanel.options && Array.isArray(subPanel.options.panels)) {
            subPanel.options.panels = subPanel.options.panels.filter(
              (panelId: string) => panelId !== panel.id,
            );
          }
          newState.panels[key] = subPanel;
        }
      });
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deleteGroup = (viewId: string, groupId: string) => {
    const view = {
      ...(viewId
        ? state.views.find((view) => view.id === viewId)
        : state.views[0]),
    };

    if (!view) throw new Error("View not found or no views available");

    updateState((state) => {
      const panelsInGroup =
        state.layout.find((group) => group.i === groupId)?.panels || [];
      const panels: typeof state.panels = {};
      getObjectKeys(state.panels).forEach((key) => {
        if (!panelsInGroup.includes(key)) {
          panels[key] = state.panels[key];
        }
      });
      const newState: DashboardState = {
        ...state,
        panels: panels,
        views: state.views.map((v) => {
          if (v.id !== view.id) return v;
          return {
            ...v,
            layout: v.layout.filter((group) => group.i !== groupId),
          };
        }),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deleteGroupFromSidebar = (groupId: string, sidebarId: string) => {
    updateState((state) => {
      const sidebar = state.sidebars.find(
        (sidebar) => sidebar.id === sidebarId,
      );
      if (!sidebar) return state;
      const panelsInGroup =
        sidebar.groups.find((group) => group.i === groupId)?.panels || [];
      const panels: typeof state.panels = {};
      getObjectKeys(state.panels).forEach((key) => {
        if (!panelsInGroup.includes(key)) {
          panels[key] = state.panels[key];
        }
      });
      const newState: DashboardState = {
        ...state,
        panels: panels,
        sidebars: state.sidebars.map((sidebar) => {
          if (sidebar.id === sidebarId) {
            return {
              ...sidebar,
              groups: sidebar.groups.filter((group) => group.i !== groupId),
            };
          }
          return sidebar;
        }),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const refreshIntegrations = async () => {
    api.getAvailableIntegrations().then((integrations) => {
      setIntegrations(integrations.integrations);
    });
  };

  const movePanelToGroup: DashboardStateWithMethods["movePanelToGroup"] =
    async (panelId, groupId, options) => {
      if (!options?.fromViewId || !options?.toViewId) return;
      const view = state.views.find((view) => view.id === options.fromViewId);
      if (!view) throw new Error("View not found or no views available");

      updateState((state) => {
        const panels = { ...state.panels };
        let addedToPanelOptions = false;

        for (const panelKey in panels) {
          const panel = panels[panelKey];
          if (panel.options && Array.isArray(panel.options.panels)) {
            panel.options.panels = panel.options.panels.filter(
              (panelIdInPanel: string) => panelIdInPanel !== panelId,
            );
            //Iterate panels in options and add after or before if found the provided panel id
            if (options?.beforePanelId || options?.afterPanelId) {
              const panelIndex = panel.options.panels.findIndex(
                (panelId: string) =>
                  panelId === options?.beforePanelId ||
                  panelId === options?.afterPanelId,
              );
              if (panelIndex > -1) {
                panel.options.panels.splice(
                  panelIndex + (options?.beforePanelId ? 0 : 1),
                  0,
                  panelId,
                );

                addedToPanelOptions = true;
              }
            }
          }
          panels[panelKey] = panel;
        }

        const newState: DashboardState = {
          ...state,
          panels: panels,
          views: state.views.map((v) => {
            if (v.id !== options.fromViewId && v.id !== options.toViewId) {
              return v;
            }
            return {
              ...v,
              layout: v.layout
                .map((group) => {
                  const panels = group.panels.filter(
                    (panel) => panel !== panelId,
                  );

                  if (!addedToPanelOptions && group.i === groupId) {
                    const panelIndex = panels.findIndex(
                      (panel) =>
                        panel === options?.beforePanelId ||
                        panel === options?.afterPanelId,
                    );
                    if (panelIndex === -1) {
                      panels.push(panelId);
                    } else {
                      panels.splice(
                        panelIndex + (options?.beforePanelId ? 0 : 1),
                        0,
                        panelId,
                      );
                    }
                  }

                  return {
                    ...group,
                    panels: panels,
                  };
                })
                .filter((group) => group.panels.length > 0),
            };
          }),
        };
        api.updateDashboard(selectedDashboard, newState);
        return newState;
      });
    };

  const addSidebar = (sidebar: Partial<Sidebar>) => {
    updateState((state) => {
      const newState = {
        ...state,
        sidebars: [
          ...state.sidebars,
          {
            ...sidebar,
            id: sidebar.id || getUniqueId(),
            groups: sidebar.groups || [],
            position: sidebar.position || "left",
            order: sidebar.order ?? 0,
          },
        ],
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const updateSidebar = (sidebar: Partial<Sidebar>) => {
    updateState((state) => {
      const newState = {
        ...state,
        sidebars: state.sidebars.map((s) => {
          if (s.id === sidebar.id) {
            return { ...s, ...sidebar };
          }
          return s;
        }),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deleteSidebar = (sidebarId: string) => {
    updateState((state) => {
      const newState = {
        ...state,
        sidebars: state.sidebars.filter((sidebar) => sidebar.id !== sidebarId),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const addView = (view: Partial<DashboardView>) => {
    updateState((state) => {
      const newState = {
        ...state,
        views: [
          ...state.views,
          {
            ...view,
            id: view.id || getUniqueId(),
            layout: view.layout || [],
            order: view.order ?? 0,
            name: view.name || "New view",
          },
        ],
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const updateView = (view: Partial<DashboardView>) => {
    updateState((state) => {
      const newState = {
        ...state,
        views: state.views.map((v) => {
          if (v.id === view.id) {
            return { ...v, ...view };
          }
          return v;
        }),
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const deleteView = (viewId: string) => {
    updateState((state) => {
      const viewIndex = state.views.findIndex((view) => view.id === viewId);
      const newState = {
        ...state,
        views: state.views.filter((view) => view.id !== viewId),
      };
      api.updateDashboard(selectedDashboard, newState);
      setSelectedDashboardView(newState.views[viewIndex - 1]?.id || null);
      return newState;
    });
  };

  const updateSettings = (settings: Partial<DashboardState["settings"]>) => {
    updateState((state) => {
      const newState = {
        ...state,
        settings: {
          ...state.settings,
          ...settings,
        },
      };
      api.updateDashboard(selectedDashboard, newState);
      return newState;
    });
  };

  const refreshDashboard = async () => {
    try {
      await refreshIntegrations();
    } catch (e) {
      logError(e);
    }
  };

  React.useEffect(() => {
    refreshDashboard().then();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        updateState: _updateState,
        updatePanel,
        addPanel,
        deletePanel,
        deleteGroup,
        deleteGroupFromSidebar,
        deletePanelFromSidebar,
        updateGroupOptions,
        integrations,
        refreshIntegrations,
        movePanelToGroup,
        addSidebar,
        updateSidebar,
        deleteSidebar,
        addView,
        updateView,
        deleteView,
        selectedDashboardView,
        setSelectedDashboardView,
        updateThemeOptions,
        updateSettings,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
