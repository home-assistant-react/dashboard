import useGetDataOrDefaults from "@home-assistant-react/hooks/src/useGetDataOrDefaults";
import React from "react";
import { Connection } from "home-assistant-js-websocket";
import {
  HassProviderInternalState,
  HassProviderProps,
} from "./HassProvider.types";
import { subscribeEntities } from "home-assistant-js-websocket";
import { loadInitialStatesFromHomeAssistant } from "./helpers";
import {
  DashboardState,
  HassConfig,
  HassCurrentUserData,
  HassEntitiesState,
  HassProviderState,
  HassUserData,
  LS_HASS_SELECTED_DASHBOARD_KEY,
} from "@home-assistant-react/types/src";
import { getHassConnection, useApi } from "@home-assistant-react/api/src";
import { useBooleanValue } from "@home-assistant-react/hooks/src";

const connections: Connection[] = [];
export const HassContext = React.createContext<HassProviderState | null>(null);

export const HassProvider: React.FC<HassProviderProps> = ({
  children,
  accessToken,
  hassUrl,
}) => {
  const loadedEntities = React.useRef<HassEntitiesState<unknown>>({});

  const api = useApi();
  const [connectionId, setConnectionId] = React.useState<number | null>(null);
  const [initialState, setInitialState] =
    React.useState<HassProviderInternalState>();
  const hasAuthError = useBooleanValue();
  const isLoaded = useBooleanValue();

  const { data: customIcons, refresh: reloadCustomIcons } =
    useGetDataOrDefaults(async () => {
      return await api!.getCustomIcons();
    });

  const { data: customImages, refresh: reloadCustomImages } =
    useGetDataOrDefaults(async () => {
      return await api!.getCustomImages();
    });

  const [loadedDashboard, setLoadedDashboard] = React.useState<
    DashboardState | undefined
  >(undefined);

  const [selectedDashboard, setSelectedDashboard] = React.useState(
    window.localStorage.getItem(LS_HASS_SELECTED_DASHBOARD_KEY) || "",
  );

  const handleSetSelectedDashboard = (dashboard: string, save?: boolean) => {
    setSelectedDashboard(dashboard);
    if (save) {
      window.localStorage.setItem(LS_HASS_SELECTED_DASHBOARD_KEY, dashboard);
    }
  };

  React.useEffect(() => {
    if (connectionId === null) {
      getHassConnection(hassUrl, accessToken || "")
        .then(async (connection) => {
          setConnectionId(connections.length);
          connections.push(connection);

          const loadedStates =
            await loadInitialStatesFromHomeAssistant(connection);
          setInitialState(loadedStates);

          await reloadCustomIcons();

          subscribeEntities(connection, (entities) => {
            loadedEntities.current = entities;
          });
        })
        .catch(() => {
          isLoaded.setTrue();
          hasAuthError.setTrue();
        });
    }

    return () => {
      if (connectionId !== null) {
        connections[connectionId].close();
      }
    };
  }, [connectionId]);

  React.useEffect(() => {
    if (connectionId === null) return;
    const connection = connections[connectionId];
    if (!connection) return;
    if (!selectedDashboard) return;

    (async () => {
      isLoaded.setFalse();
      api.getDashboard(selectedDashboard).then((dashboard) => {
        setLoadedDashboard(dashboard);
        console.log("LOADED DASHBOARD", dashboard);
      });
      isLoaded.setTrue();
    })().then();
  }, [connectionId, selectedDashboard]);

  if (!initialState) return null;

  return (
    <HassContext.Provider
      value={{
        connection: connections[connectionId!],
        areas: initialState?.areas || {},
        entitiesInfo: initialState?.entitiesInfo || {},
        config: initialState?.config || ({} as HassConfig),
        userData: initialState?.userData || ({} as HassUserData),
        currentUser: initialState?.currentUser || ({} as HassCurrentUserData),
        locale: initialState?.locale || {},
        hasAuthError: hasAuthError.value,
        isLoaded: isLoaded.value,
        loadedDashboard,
        customIcons,
        selectedDashboard,
        setSelectedDashboard: handleSetSelectedDashboard,
        reloadCustomIcons: reloadCustomIcons,
        customImages,
        reloadCustomImages,
        loadedEntities,
      }}
    >
      {children}
    </HassContext.Provider>
  );
};
