import { useDashboardEditor } from "@home-assistant-react/api/src";
import { dashboardHotkeys } from "@home-assistant-react/defines/src/hotkeys/dashboard-hotkeys";
import { useLayout } from "@home-assistant-react/ui/src/components/layout/LayoutProvider";
import React, { PropsWithChildren } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const DashboardGridHotKeys: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isArranging } = useDashboardEditor();
  const { settingsDisclosure } = useLayout();

  // Toggle dashboard arrange mode
  useHotkeys(
    dashboardHotkeys.TOGGLE_ARRANGE_MODE,
    (keyboardEvent) => {
      keyboardEvent.preventDefault();
      isArranging.toggle();
    },
    {
      scopes: ["dashboard"],
    },
  );

  // Open dashboard settings
  useHotkeys(
    dashboardHotkeys.OPEN_DASHBOARD_SETTINGS,
    (keyboardEvent) => {
      keyboardEvent.preventDefault();
      settingsDisclosure.open();
    },
    {
      scopes: ["dashboard"],
    },
  );
  return <>{children}</>;
};
