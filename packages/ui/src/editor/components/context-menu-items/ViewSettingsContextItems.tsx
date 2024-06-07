import {
  useDashboard,
  useDashboardEditor,
} from "@home-assistant-react/api/src";
import React from "react";
import { ContextMenuItem } from "../../../components";

export const ViewSettingsContextItems: React.FC = () => {
  const { selectedDashboardView } = useDashboard();
  const { editorModalDisclosure } = useDashboardEditor();
  return (
    <>
      <ContextMenuItem
        icon={"Settings"}
        onClick={() => {
          if (!selectedDashboardView) return;

          editorModalDisclosure.open({
            modal: "view",
            viewId: selectedDashboardView,
          });
        }}
      >
        View settings
      </ContextMenuItem>
    </>
  );
};
