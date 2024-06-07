import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";

export const coverPanelConfigOptions: PanelEditorConfig = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "Target entity",
          domain: "cover",
        },
        {
          type: EditorPropertyType.Text,
          name: "custom_name",
          label: "Custom name",
          description: "Custom name for the cover",
        },
      ],
    },
    {
      title: "Header & Direction",
      options: [
        {
          type: EditorPropertyType.Select,
          name: "direction",
          label: "Buttons direction",
          options: [
            { value: "horizontal", label: "Horizontal" },
            { value: "vertical", label: "Vertical" },
          ],
          description: "Direction of the buttons",
        },
        {
          type: EditorPropertyType.Direction,
          name: "headerDirection",
          label: "Header direction",
          description: "Direction of the header",
        },
        {
          type: EditorPropertyType.Visibility,
          name: "showTitle",
          label: "Show title",
          description: "Show title",
        },
      ],
    },
    {
      title: "Buttons",
      options: [
        {
          type: EditorPropertyType.Visibility,
          name: "showHalfButton",
          label: "Show half button",
        },
        {
          type: EditorPropertyType.Visibility,
          name: "showGlimmerButton",
          label: "Show glimmer button",
        },

        {
          type: EditorPropertyType.Visibility,
          name: "showStopButton",
          label: "Show stop button",
        },

        {
          type: EditorPropertyType.Visibility,
          name: "showCloseButton",
          label: "Show close button",
        },

        {
          type: EditorPropertyType.Visibility,
          name: "showOpenButton",
          label: "Show open button",
        },
      ],
    },
    {
      title: "Icons",
      options: [
        {
          type: EditorPropertyType.Icon,
          name: "icon_open",
          label: "Open",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_closed",
          label: "Closed",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_opening",
          label: "Opening",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_closing",
          label: "Closing",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_button_open",
          label: "Open button",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_button_close",
          label: "Close button",
        },

        {
          type: EditorPropertyType.Icon,
          name: "icon_button_stop",
          label: "Stop button",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_button_half",
          label: "Half button",
        },
        {
          type: EditorPropertyType.Icon,
          name: "icon_button_glimmer",
          label: "Glimmer button",
        },
      ],
    },
    {
      title: "Half & Glimmer position",
      options: [
        {
          type: EditorPropertyType.Number,
          name: "halfPosition",
          label: "Half position",
          min: 0,
          max: 100,
          description: "Position of the cover when the half button is pressed",
        },
        {
          type: EditorPropertyType.Number,
          name: "glimmerPosition",
          label: "Glimmer position",
          min: 0,
          max: 100,
          description:
            "Position of the cover when the glimmer button is pressed",
        },
      ],
    },
  ],
};
