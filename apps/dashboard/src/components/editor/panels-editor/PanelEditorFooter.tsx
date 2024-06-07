import { stripUndefinedValuesFromObject } from "@home-assistant-react/helpers/src/objects/stripUndefinedValuesFromObject";
import React from "react";
import { Button, Flex, useToastSuccess } from "@home-assistant-react/ui/src";
import {
  useDashboard,
  useDashboardEditor,
  usePanelEditor,
} from "@home-assistant-react/api/src";

const classes = {
  Wrapper: "p-2 bg-muted border-t justify-between relative",
};

export const PanelEditorFooter = React.forwardRef<HTMLDivElement>((_, ref) => {
  const panelEditor = usePanelEditor();
  const dashboard = useDashboard();
  const dashboardEditor = useDashboardEditor();
  const toastSuccess = useToastSuccess();

  const handleApplyChanges = () => {
    if (!panelEditor.panel) return;
    toastSuccess("Changes applied");
    dashboard.updatePanel({
      ...panelEditor.panel,
      options: stripUndefinedValuesFromObject(panelEditor.panel?.options || {}),
    });
    if (panelEditor.group) {
      dashboard.updateGroupOptions(
        panelEditor.group,
        panelEditor.groupOptions,
        {
          sidebarId: panelEditor.sidebarId,
          viewId: dashboard.selectedDashboardView,
        },
      );
    }
  };

  const handleDeletePanel = () => {
    panelEditor.deletePanel();
  };

  return (
    <Flex ref={ref} className={classes.Wrapper}>
      <Button
        onClick={handleDeletePanel}
        variant={"destructive"}
        icon={"Trash"}
      >
        Delete
      </Button>
      <Flex className={"gap-2"}>
        <Button
          variant={"outline"}
          //disabled={!panelEditor.hasChanges}
          onClick={dashboardEditor.panelsEditorDisclosure.onClose.bind(
            null,
            undefined,
          )}
        >
          Cancel
        </Button>
        <Button
          //disabled={!panelEditor.hasChanges}
          onClick={handleApplyChanges}
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );
});

PanelEditorFooter.displayName = "PanelEditorFooter";
