import { useDashboardEditor } from "@home-assistant-react/api/src";
import { getObjectDataTransfer } from "@home-assistant-react/helpers/src";
import {
  DashboardState,
  DashboardView,
  NewPanelDragData,
} from "@home-assistant-react/types/src";
import { useToastError } from "@home-assistant-react/ui/src";
import React from "react";
import GridLayout from "react-grid-layout";
import ReactGridLayout, { ItemCallback } from "react-grid-layout";

/**
 * Callback function triggered when resizing panels on a grid layout.
 * Adjusts the layout item and placeholder width based on height and width constraints.
 * @param _layout - The current layout of the grid.
 * @param _oldLayoutItem - The previous layout item being resized.
 * @param layoutItem - The current layout item being resized.
 * @param placeholder - The placeholder representing the layout item during resizing.
 */
export const onPanelsGridResize: ItemCallback = (
  _layout,
  _oldLayoutItem,
  layoutItem,
  placeholder,
) => {
  if (layoutItem.h < 3 && layoutItem.w > 2) {
    layoutItem.w = 2;
    placeholder.w = 2;
  }

  if (layoutItem.h >= 3 && layoutItem.w < 2) {
    layoutItem.w = 2;
    placeholder.w = 2;
  }
};

/**
 * Returns a callback function to handle dropping new panels onto a grid layout.
 * @param view - The dashboard view where the panels will be dropped.
 * @returns The callback function to handle the drop event.
 */
export const useGridLayoutDropCallback = (
  view?: DashboardView,
): React.ComponentProps<typeof ReactGridLayout>["onDrop"] => {
  const toastError = useToastError();
  const { addNewPanel } = useDashboardEditor();

  return React.useCallback(
    function (_, layoutItem, _event) {
      if (!view) return;
      const event = _event as DragEvent;

      const dragData = getObjectDataTransfer<NewPanelDragData>(
        event.dataTransfer,
      );

      // If drag data is missing or incorrect, display an error toast
      if (dragData?.type !== "new-panel") {
        return toastError("Something went wrong, no drag data.");
      }

      // Retrieve panel component from drag data
      const panelComponent = dragData.component;
      if (!panelComponent) {
        toastError("Something went wrong, no panel type.");
        return;
      }

      addNewPanel(
        {
          panelComponent,
          layoutInfo: {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          },
          panelOptions: dragData.options,
          viewId: view.id,
        },
        dragData.openEdit === true,
      );

      return;
    } satisfies React.ComponentProps<typeof ReactGridLayout>["onDrop"],
    // Dependencies: view id
    [view?.id],
  );
};

/**
 * Updates the layout of a specific dashboard view with the provided changed layout.
 * @param changed - The changed layout to apply.
 * @param dashboardState - The current state of the dashboard.
 * @param view - The dashboard view to update.
 * @returns The updated dashboard state with the modified layout for the specified view.
 */
export const mapChangedLayout = (
  changed: GridLayout.Layout[],
  dashboardState: DashboardState,
  view: DashboardView,
): DashboardState => {
  return {
    ...dashboardState,
    views: dashboardState.views.map((v) => {
      if (v.id !== view.id) return v;
      return {
        ...v,
        layout: changed.map((layout) => {
          const dsLayout = view.layout.find((_l) => _l.i === layout.i);

          return {
            ...(dsLayout ? dsLayout : { ...layout, panels: [] }),
            ...layout,
          };
        }),
      };
    }),
  };
};
