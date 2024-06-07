import {
  HassEntitiesState,
  MouseTouchEvent,
} from "@home-assistant-react/types/src";
import React from "react";

export interface EntityPickerDragData {
  entityId: string;
  panelComponentName: string;
}

export interface EntityPickerProps {
  entities?: HassEntitiesState;
  hasDraggableItems?: boolean;
  onDragStart?: (
    event: React.DragEvent<HTMLDivElement>,
    entityId: string,
  ) => void;
  onClick?: (event: MouseTouchEvent, entityId: string) => void;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
  onSelect?: (entityId: string) => void;
  onEntitySelect?: (entityId: string) => void;
  hasAddButton?: boolean;
  selectedEntityId?: string;
}
