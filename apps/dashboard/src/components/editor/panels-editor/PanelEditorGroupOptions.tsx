import { usePanelEditor } from "@home-assistant-react/api/src";
import {
  EditorPropertyType,
  PanelEditorConfigGroup,
  PanelsGroupOptions,
} from "@home-assistant-react/types/src";
import { Box } from "@home-assistant-react/ui/src";
import React from "react";
import { PanelEditorProperties } from "./PanelEditorProperties";

const options: PanelEditorConfigGroup<PanelsGroupOptions>[] = [
  {
    title: "Group",
    options: [
      {
        type: EditorPropertyType.Select,
        label: "Group type",
        name: "groupType",
        options: [
          { label: "Slide", value: "swiper" },
          { label: "Grid", value: "grid" },
        ],
      },
      {
        type: EditorPropertyType.Number,
        label: "Grid columns",
        name: "gridColumns",
      },
      {
        type: EditorPropertyType.Icon,
        label: "Grid title icon",
        name: "gridTitleIcon",
      },
      {
        type: EditorPropertyType.Text,
        label: "Grid title",
        name: "gridTitle",
      },
      {
        type: EditorPropertyType.Select,
        label: "Group swipe animation",
        name: "effect",
        options: [
          { label: "Slide", value: "slide" },
          { label: "Slide in out zoom", value: "slide-in-out-zoom" },
          { label: "Slide in out", value: "slide-in-out" },
          { label: "Slide in Fade out", value: "slide-in" },
          { label: "Slide 3D", value: "slide-3d" },
          { label: "Cards", value: "cards" },
        ],
      },
      {
        type: EditorPropertyType.Select,
        label: "Items per page",
        name: "slidesPerView",
        description:
          "Number of slides per page. It only works with slide effect",
        options: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
        ],
      },
    ],
  },
  {
    title: "Autoplay",
    options: [
      {
        type: EditorPropertyType.Select,
        label: "Enabled",
        name: "autoPlay",
        options: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
      },
      {
        type: EditorPropertyType.Select,
        label: "Delay",
        name: "autoPlayDelay",
        options: [
          { label: "5 seconds", value: 5000 },
          { label: "10 seconds", value: 10000 },
          { label: "15 seconds", value: 15000 },
          { label: "30 seconds", value: 30000 },
          { label: "1 minute", value: 60000 },
          { label: "5 minute", value: 300000 },
        ],
      },
    ],
  },
];

export const PanelEditorGroupOptions = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    const panelEditor = usePanelEditor();

    if (!panelEditor.panel) return null;

    return (
      <Box ref={ref}>
        <PanelEditorProperties
          values={panelEditor.groupOptions}
          options={options}
          onChange={(name, value) => {
            panelEditor.updateGroupOption(name, value);
          }}
        />
      </Box>
    );
  },
);

PanelEditorGroupOptions.displayName = "PanelEditorGroupOptions";
