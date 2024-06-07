import React from "react";
import { ApiClient } from "@home-assistant-react/api/src/api";
import { ApiProvider } from "@home-assistant-react/providers/src";
import { PluginsProvider } from "@home-assistant-react/providers/src/PluginsProvider";
import { LayoutProvider } from "@home-assistant-react/ui/src/components/layout/LayoutProvider";
import { HotkeysProvider } from "react-hotkeys-hook";

interface AppProvidersProps extends React.PropsWithChildren {
  apiClientRef: React.MutableRefObject<ApiClient | undefined>;
}

export const AppProviders: React.FC<AppProvidersProps> = ({
  children,
  apiClientRef,
}) => {
  return (
    <HotkeysProvider initiallyActiveScopes={["dashboard"]}>
      <ApiProvider apiClient={apiClientRef.current}>
        <PluginsProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PluginsProvider>
      </ApiProvider>
    </HotkeysProvider>
  );
};
