import { NewPanelDragData, PanelFC } from "@home-assistant-react/types/src";
import { FlexProps } from "../../../../primitives/common";
import React from "react";

export interface PanelComponentPreviewProps
  extends Omit<FlexProps, "onDragStart"> {
  panelKey: string;
  panel: PanelFC;
  onDragStart?: (event: React.DragEvent, dragData?: NewPanelDragData) => void;
}
