import { getPanelEditorConfigDefaultOptions } from "@home-assistant-react/api/src/dashboard/helpers/getPanelEditorConfigDefaultOptions";
import React from "react";
import { usePanelEditor } from "@home-assistant-react/api/src";
import { getPanelEditorConfig } from "@home-assistant-react/api/src/dashboard";
import { Box } from "@home-assistant-react/ui/src";
import { PanelEditorProperties } from "./PanelEditorProperties";

const classes = {
  NoOptionsContainer: "p-10 text-center",
};

export const PanelEditorPanelOptions = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    const panelEditor = usePanelEditor();

    if (!panelEditor.panel || !panelEditor.panel.component) return null;

    const panelEditingConfig = getPanelEditorConfig(
      panelEditor.panel.component,
    );

    const defaultOptions = getPanelEditorConfigDefaultOptions(
      panelEditor.panel.component,
    );

    const optionValues = { ...defaultOptions, ...panelEditor.panel?.options };

    return (
      <Box ref={ref}>
        {!panelEditingConfig?.customOptions && (
          <Box className={classes.NoOptionsContainer}>
            This component have no configurable options
          </Box>
        )}

        <PanelEditorProperties
          panel={panelEditor.panel}
          values={optionValues || {}}
          options={panelEditingConfig?.customOptions || []}
          onChange={(name, value) => {
            panelEditor.updateOptions(name, value);
          }}
        />
      </Box>
    );
  },
);

PanelEditorPanelOptions.displayName = "PanelEditorPanelOptions";
