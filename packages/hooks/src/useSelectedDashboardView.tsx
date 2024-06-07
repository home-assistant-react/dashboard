import { useDashboard } from "@home-assistant-react/api/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import React from "react";

export const useSelectedDashboardView = () => {
  const dashboard = useDashboard();

  return React.useMemo(() => {
    if (!dashboard.selectedDashboardView) return dashboard?.views?.[0];
    return (
      dashboard.views.find((v) => v.id === dashboard.selectedDashboardView) ||
      undefined
    );
  }, [dashboard.selectedDashboardView, sanitizeDep(dashboard.views)]);
};
