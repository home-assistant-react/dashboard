import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import React from "react";
import { usePanelEditor } from "@home-assistant-react/api/src";
import { getPanelEditorStyles } from "@home-assistant-react/api/src/dashboard/helpers/get-panel-editor-styles";
import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { Box, Flex, SelectItem } from "@home-assistant-react/ui/src";
import { StyleEditorState } from "@home-assistant-react/types/src";
import { StyleEditor } from "@home-assistant-react/ui/src/editor";

const classes = {
  Wrapper: "w-full h-full flex-col",
  StyleGroupSelector: "w-full border-b bg-secondary/40 p-4 pb-8",
  GroupSelectOption: "h-12",
  GroupSelectOptionTitle: "text-left",
  GroupSelectOptionDescription: "text-primary text-left",
};

export const PanelStyleEditor = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const panelEditor = usePanelEditor();

    const panelStyles = panelEditor.panel
      ? getPanelEditorStyles(panelEditor.panel)
      : {};
    const styleKeys = getObjectKeys(panelStyles) || [];
    const [selectedStyleKey, setSelectedStyleKey] = React.useState(
      styleKeys?.[0] || "",
    );

    const updateStyle: StyleEditorState["updateStyle"] = React.useCallback(
      (styleProp, styleValue) => {
        panelEditor.updateStyle(selectedStyleKey, styleProp, styleValue);
      },
      [selectedStyleKey],
    );

    if (!panelEditor.panel) return null;

    return (
      <Flex ref={ref} className={classes.Wrapper}>
        <Box className={classes.StyleGroupSelector}>
          <SelectInput
            value={selectedStyleKey}
            onChangeValue={(value) => {
              setSelectedStyleKey(value);
            }}
            hideEmptyMessages
            label={"Style component to change"}
          >
            {styleKeys.map((style, styleIndex) => {
              return (
                <SelectItem
                  className={classes.GroupSelectOption}
                  key={`${style}-${styleIndex}`}
                  value={style}
                >
                  <Flex className={"items-center"}>
                    <Box className={"flex-grow"}>
                      <Box className={classes.GroupSelectOptionTitle}>
                        {panelStyles[style].title || "Unknown"}
                      </Box>
                      <Box className={classes.GroupSelectOptionDescription}>
                        {panelStyles[style].description || " "}
                      </Box>
                    </Box>
                  </Flex>
                </SelectItem>
              );
            })}
          </SelectInput>
        </Box>
        <StyleEditor
          key={selectedStyleKey}
          onPropertyChange={updateStyle}
          style={panelEditor.panel.styles?.[selectedStyleKey]}
          styleKey={selectedStyleKey}
          enabledCategories={panelStyles[selectedStyleKey]?.enabledCategories}
        />
      </Flex>
    );
  },
);

PanelStyleEditor.displayName = "PanelStyleEditor";
