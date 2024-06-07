import React from "react";
import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";
import { WasteCustomDatesConfiguration } from "./WasteCustomDatesConfiguration";
import { wasteValues } from "./defines";

const defaultLabel = "None";

export const wastePanelConfiguration: PanelEditorConfig = {
  customOptions: [
    {
      title: "Options",
      options: [
        {
          label: "Show next date",
          name: "showNextDate",
          type: EditorPropertyType.YesNo,
          description:
            "Show next date on the panel (What you have to put out for collection on the next date)",
        },
      ],
    },
    {
      title: "Days",
      options: [
        {
          type: EditorPropertyType.Select,
          label: "Monday",
          name: "monday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Tuesday",
          name: "tuesday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Wednesday",
          name: "wednesday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Thursday",
          name: "thursday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Friday",
          name: "friday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Saturday",
          name: "saturday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
        {
          type: EditorPropertyType.Select,
          label: "Sunday",
          name: "sunday",
          options: wasteValues,
          defaultLabel: defaultLabel,
        },
      ],
    },
    {
      title: "Custom dates",
      component: () => <WasteCustomDatesConfiguration />,
    },
    {
      title: "Custom days",
      component: () => <WasteCustomDatesConfiguration isDays />,
    },
    {
      title: "Custom icons",
      options: [
        {
          type: EditorPropertyType.Icon,
          name: "icon",
          label: "Icon",
          description: "Icon to show on the panel",
        },
      ],
    },
  ],
};
