import React from "react";
import { usePanelEditor } from "@home-assistant-react/api/src";
import { AlbumSelector } from "@home-assistant-react/ui/src";
import { Panel } from "@home-assistant-react/types/src";
import { SlideshowOptions } from "./types";

export const AlbumsConfiguration: React.FC = () => {
  const panelEditor = usePanelEditor();
  const panel: Panel<SlideshowOptions> | undefined = panelEditor.panel;
  if (!panel) return null;

  return (
    <AlbumSelector
      value={panel.options?.albums}
      onChange={(albums) => {
        panelEditor.updateOptions("albums", albums);
      }}
    />
  );
};
