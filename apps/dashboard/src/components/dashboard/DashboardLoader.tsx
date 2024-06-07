import React from "react";
import { HassContext, HassProvider } from "@home-assistant-react/providers/src";
import { useApi } from "@home-assistant-react/api/src";
import { FullPageLoading } from "../FullPageLoading";
import { Dashboard } from "./Dashboard";
import { DashboardSelector } from "../onboarding/DashboardSelector";
import {
  checkForApiConfiguration,
  useWaitForAllPluginsToLoad,
} from "./helpers";

export const DashboardLoader: React.FC = () => {
  const api = useApi();
  const isLoaded = useWaitForAllPluginsToLoad();

  if (!isLoaded) return <FullPageLoading />;

  checkForApiConfiguration(api.authData);

  return (
    <HassProvider
      hassUrl={api.authData!.hassUrl!}
      accessToken={api.authData.access_token}
    >
      <HassContext.Consumer>
        {(hass) => {
          if (!hass?.selectedDashboard || !hass?.loadedDashboard)
            return <DashboardSelector />;
          return <Dashboard />;
        }}
      </HassContext.Consumer>
    </HassProvider>
  );
};
