import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";

export const actionPanelConfigOptions: PanelEditorConfig = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "target_entity",
          domain: "script",
        },
        {
          type: EditorPropertyType.Text,
          name: "custom_label",
          label: "Custom label",
        },
        {
          type: EditorPropertyType.Icon,
          name: "custom_icon",
          label: "Custom icon",
        },
      ],
    },
  ],
};
