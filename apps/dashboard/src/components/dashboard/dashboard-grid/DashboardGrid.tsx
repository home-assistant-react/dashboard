import { useSelectedDashboardView } from "@home-assistant-react/hooks/src/useSelectedDashboardView";
import React from "react";
import { Box } from "@home-assistant-react/ui/src";
import { defaultDashboardOptions } from "@home-assistant-react/types/src";
import { DashboardGridEmptyView } from "./DashboardGridEmptyView";
import { DashboardSections } from "../DashboardSections";
import { DashboardGridLayout } from "./DashboardGridLayout";
import { DashboardGridScrollArea } from "./DashboardGridScrollArea";
import { useDashboard } from "@home-assistant-react/api/src";
import { NoViewsOnboarding } from "./NoViewsOnboarding";

const classes = {
  Content: "panels-group relative w-full min-h-full h-full",
};

export const DashboardGrid: React.FC = () => {
  const dashboard = useDashboard();
  const view = useSelectedDashboardView();

  if (!view) {
    return <NoViewsOnboarding />;
  }

  const showViewSelectorValue =
    dashboard.settings?.showViewSelector ??
    defaultDashboardOptions.showViewSelector ??
    "auto";

  const showViewSelector =
    showViewSelectorValue === "always" ||
    (showViewSelectorValue === "auto" && dashboard.views.length > 1);

  return (
    <DashboardGridScrollArea>
      <Box className={classes.Content}>
        {showViewSelector && <DashboardSections />}
        {view.layout?.length === 0 && <DashboardGridEmptyView />}
        {view && <DashboardGridLayout view={view} />}
      </Box>
    </DashboardGridScrollArea>
  );
};
