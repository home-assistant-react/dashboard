import React from "react";
import {
  DashboardProvider,
  LocaleProvider,
} from "@home-assistant-react/providers/src";
import { DashboardEditorProvider } from "@home-assistant-react/providers/src/DashboardEditorProvider/DashboardEditorProvider";
import { useHass } from "@home-assistant-react/api/src";
import { ThemeProvider } from "@home-assistant-react/providers/src/ThemeProvider";
import { FloatingSettingsButton } from "@home-assistant-react/ui/src/editor";

import { AuthError } from "../auth/AuthError";
import { AddPanelDrawer } from "../editor/add-panel-drawer/AddPanelDrawer";
import { DashboardEditorModals } from "../editor/DashboardEditorModals";
import { PanelsEditorDrawer } from "../editor/panels-editor/PanelsEditorDrawer";
import { SettingsDrawer } from "../settings/SettingsDrawer/SettingsDrawer";
import { DashboardLayout } from "./DashboardLayout";
import { DashboardGridHotKeys } from "../hot-keys/DashboardGridHotKeys";
import { FullPageLoading } from "../FullPageLoading";

export const Dashboard: React.FC = () => {
  const { hasAuthError, isLoaded, loadedDashboard } = useHass();

  if (hasAuthError) {
    return <AuthError />;
  }

  if (!isLoaded) {
    return <FullPageLoading />;
  }

  return (
    <DashboardProvider initialState={loadedDashboard} key={loadedDashboard?.id}>
      <ThemeProvider>
        <LocaleProvider>
          <DashboardEditorProvider>
            <DashboardGridHotKeys>
              <DashboardLayout />
              <PanelsEditorDrawer />
              <AddPanelDrawer />
              <FloatingSettingsButton />
              <DashboardEditorModals />
            </DashboardGridHotKeys>
          </DashboardEditorProvider>
          <SettingsDrawer />
        </LocaleProvider>
      </ThemeProvider>
    </DashboardProvider>
  );
};
