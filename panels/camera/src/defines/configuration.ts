import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";

export const cameraPanelConfigOptions: PanelEditorConfig = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "target_entity",
          domain: "camera",
        },
      ],
    },
  ],
};
