import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";

export const lightPanelConfigOptions: PanelEditorConfig = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "target_entity",
          domain: "light",
        },
      ],
    },
    {
      title: "Options",
      options: [
        {
          type: EditorPropertyType.YesNo,
          name: "sliderOnPanel",
          label: "Slider on panel",
        },
        {
          type: EditorPropertyType.YesNo,
          name: "showToggle",
          label: "Show toggle button",
        },
        {
          type: EditorPropertyType.YesNo,
          name: "showStatus",
          label: "Show status text",
        },
      ],
    },
  ],
};
