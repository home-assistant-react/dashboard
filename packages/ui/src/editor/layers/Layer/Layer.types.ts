import React from "react";
import {
  LayerDragData,
  LayerGroupDragData,
} from "@home-assistant-react/types/src";

export interface LayerProps {
  onClick?: () => void;
  isSelected?: boolean;
  isRemoved?: boolean;
  isHidden?: boolean;
  depth?: number;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onAdd?: () => void;
  ids?: string[];
  dragData?: LayerDragData | LayerGroupDragData;
  setDragData?: (data?: LayerDragData | LayerGroupDragData) => void;
  onDrop?: (
    data: LayerDragData,
    droppedAfter: boolean,
    event: React.DragEvent<HTMLDivElement>,
  ) => void;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  positionInGroup?: number;
}
