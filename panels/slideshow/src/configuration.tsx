import {
  EditorPropertyType,
  PanelEditorConfig,
} from "@home-assistant-react/types/src";
import React from "react";
import { AlbumsConfiguration } from "./AlbumsConfiguration";

export const slideshowConfiguration: PanelEditorConfig = {
  customOptions: [
    { title: "Albums", component: () => <AlbumsConfiguration /> },
    {
      title: "Playback options",
      options: [
        {
          type: EditorPropertyType.YesNo,
          label: "Autoplay",
          name: "autoplayEnabled",
          description: "If enabled, the slideshow will automatically play.",
        },
        {
          type: EditorPropertyType.Number,
          label: "Slide delay (seconds)",
          name: "autoplayDelay",
          max: 1000,
          description:
            "The number of seconds to wait before changing to the next slide.",
        },
        {
          type: EditorPropertyType.Number,
          label: "Refresh delay (minutes)",
          name: "refreshMinutes",
          max: 1500,
          description:
            "The number of minutes to wait before refreshing the album.",
        },
        {
          type: EditorPropertyType.Number,
          label: "Items per slide",
          name: "itemsPerSlide",
          max: 5,
          description: "The number of items to show per slide.",
        },
        {
          type: EditorPropertyType.Number,
          label: "Items per group",
          name: "itemsPerGroup",
          max: 5,
          description: "The number of items to show per group.",
        },
        {
          type: EditorPropertyType.Number,
          label: "Max items",
          name: "maxItems",
          max: 20,
          description: "The maximum number of items to show.",
        },
      ],
    },
    {
      title: "Slideshow options",
      options: [
        {
          type: EditorPropertyType.YesNo,
          label: "Show pagination",
          name: "showPagination",
          description:
            "If enabled, the slideshow will show the dots for pagination.",
        },
        {
          type: EditorPropertyType.YesNo,
          label: "Show navigation",
          name: "showNavigation",
          description:
            "If enabled, the slideshow will show the arrows for navigation.",
        },
      ],
    },
  ],
};
