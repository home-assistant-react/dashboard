import React from "react";
import { PanelFC } from "@home-assistant-react/types/src";
import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import { Box } from "../../../primitives/common";
import { PanelProvider } from "@home-assistant-react/providers/src";
import { PanelCard } from "../../dashboard";
import { getUniqueId } from "@home-assistant-react/helpers/src";
import {
  DEFAULT_GRID_PANEL_H,
  DEFAULT_GRID_PANEL_W,
  DEFAULT_GRID_ROWS_HEIGHT,
} from "@home-assistant-react/defines/src";
import { useDashboard } from "@home-assistant-react/api/src";
import { createPortal } from "react-dom";

export interface EntityPickerDragImageProps {
  panelComponentName?: string;
  entityId?: string;
}

export const EntityPickerDragImage = React.forwardRef<
  HTMLDivElement,
  EntityPickerDragImageProps
>(({ panelComponentName, entityId }, ref) => {
  const dashboard = useDashboard();
  let ContentComponent: PanelFC | null = null;
  if (panelComponentName) {
    ContentComponent = getPanelComponent(panelComponentName);
  }

  const panelHeight =
    DEFAULT_GRID_PANEL_H *
    (dashboard.gridOptions?.rowsHeight || DEFAULT_GRID_ROWS_HEIGHT);

  //TODO - to fix with real width
  const panelWidth =
    DEFAULT_GRID_PANEL_W *
    (dashboard.gridOptions?.rowsHeight || DEFAULT_GRID_ROWS_HEIGHT) *
    3;

  return createPortal(
    <>
      {ContentComponent && (
        <Box
          ref={ref}
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: panelWidth,
            height: panelHeight,
          }}
        >
          <PanelProvider value={{ isPreview: true }}>
            <PanelCard className={"w-full"} panelComponent={panelComponentName}>
              <ContentComponent
                panel={{
                  component: "",
                  id: getUniqueId(),
                  options: { entity_id: entityId },
                }}
                group={{} as never}
                isGrouped
              />
            </PanelCard>
          </PanelProvider>
        </Box>
      )}
    </>,
    window.document.body,
  );
});

EntityPickerDragImage.displayName = "EntityPickerDragImage";
