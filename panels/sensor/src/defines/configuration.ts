import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";
import { SensorOptions } from "../types";

export const sensorPanelConfigOptions: PanelEditorConfig<SensorOptions> = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "target_entity",
          domain: "sensor",
        },
      ],
    },
    {
      title: "Chart",
      options: [
        {
          type: EditorPropertyType.Toggle,
          name: "showChart",
          label: "Show chart",
        },
        {
          type: EditorPropertyType.Entity,
          name: "chartEntity",
          label: "Chart entity",
          domain: "sensor",
        },
        {
          type: EditorPropertyType.Number,
          name: "chartUpdateInterval",
          label: "Chart update interval",
        },
        {
          type: EditorPropertyType.Number,
          name: "chartHistoryInterval",
          label: "Chart history interval",
        },
        {
          type: EditorPropertyType.Select,
          name: "chartHistoryIntervalType",
          label: "Chart history interval type",
          options: [
            { value: "minutes", label: "Minutes" },
            { value: "hours", label: "Hours" },
            { value: "days", label: "Days" },
          ],
        },
        /*{
          type: EditorPropertyType.Color,
          name: "chartLineColor",
          label: "Chart line color",
        },
        {
          type: EditorPropertyType.Color,
          name: "chartFillColor",
          label: "Chart background color",
        },*/
      ],
    },
  ],
};
