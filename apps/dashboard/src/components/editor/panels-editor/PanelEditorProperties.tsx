import {
  Dict,
  Panel,
  PanelEditorConfigGroup,
} from "@home-assistant-react/types/src";
import React from "react";
import { Box, Grid } from "@home-assistant-react/ui/src";

import { getPropertyController } from "@home-assistant-react/api/src/dashboard";
import { EditorCategoryWrapper } from "@home-assistant-react/ui/src/editor";

const classes = {
  PropertiesGrid:
    "min-h-min w-full gap-6 items-end grid-cols-[1fr_1fr_1fr]" +
    " panel-editor-wrapper",
};

export interface PanelEditorPropertiesProps {
  options: PanelEditorConfigGroup[];
  onChange: (key: string, value: unknown) => void;
  values: Dict;
  panel?: Panel;
}

export const PanelEditorProperties = React.forwardRef<
  HTMLDivElement,
  PanelEditorPropertiesProps
>(({ options, panel, onChange, values }, ref) => {
  return (
    <Box ref={ref}>
      {options.map((group, groupIndex) => (
        <EditorCategoryWrapper key={groupIndex} title={group.title}>
          {group.component && <group.component />}
          {(group?.options?.length || 0) > 0 ? (
            <Grid className={classes.PropertiesGrid}>
              {group.options!.map((option, optionIndex) => {
                const OptionControllerComponent = getPropertyController(
                  option.type,
                );
                const panelKey = `${option.name}${
                  panel ? `-${panel.id}` : ""
                }-${optionIndex}`;

                if (!OptionControllerComponent)
                  return <React.Fragment key={panelKey}></React.Fragment>;

                return (
                  <OptionControllerComponent
                    key={panelKey}
                    panel={panel}
                    value={values[option.name]}
                    onChange={(value) => {
                      onChange(String(option.name), value);
                    }}
                    property={option as never}
                  />
                );
              })}
            </Grid>
          ) : undefined}
        </EditorCategoryWrapper>
      ))}
    </Box>
  );
});

PanelEditorProperties.displayName = "PanelEditorProperties";
