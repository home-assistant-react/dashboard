import { dashboardHotkeys } from "@home-assistant-react/defines/src/hotkeys/dashboard-hotkeys";
import React from "react";
import { ContextMenuItem, ContextMenuShortcut } from "../../../components";
import { useLayout } from "../../../components/layout/LayoutProvider";

export const DashboardSettingsContextItems: React.FC = () => {
  const { settingsDisclosure } = useLayout();
  return (
    <>
      <ContextMenuItem
        icon={"Settings"}
        onClick={settingsDisclosure.open.bind(null, undefined)}
      >
        Dashboard settings
        <ContextMenuShortcut
          sequence={dashboardHotkeys.OPEN_DASHBOARD_SETTINGS}
        />
      </ContextMenuItem>
    </>
  );
};
