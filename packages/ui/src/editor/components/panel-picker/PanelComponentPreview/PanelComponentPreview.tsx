import React from "react";
import { PanelComponentPreviewProps } from "./PanelComponentPreview.types";
import { Box, Flex } from "../../../../primitives/common";
import { PanelCard } from "../../../../components";
import { PanelProvider } from "@home-assistant-react/providers/src";
import { NewPanelDragData } from "@home-assistant-react/types/src";

const classes = {
  Wrapper:
    "flex flex-col overflow-hidden border border-input rounded-md hover:shadow-md cursor-pointer",
  Title:
    "text-center bg-primary-background/60 border-b border-input p-3 text-sm",
  PanelPreview:
    "items-center justify-center py-4 px-8 bg-secondary/60 flex-grow pointer-events-none",
  Card: "w-full",
};

export const PanelComponentPreview = React.forwardRef<
  HTMLDivElement,
  PanelComponentPreviewProps
>((props, ref) => {
  const { panel, onDragStart, panelKey, ...rest } = props;
  const previewPanelRef = React.useRef<HTMLDivElement>(null);
  return (
    <PanelProvider value={{ isPreview: true }}>
      <Flex
        ref={ref}
        {...rest}
        onDragStart={
          onDragStart || rest.draggable
            ? (event) => {
                const dragData: NewPanelDragData = {
                  type: "new-panel",
                  component: panelKey,
                };
                if (previewPanelRef.current) {
                  event.dataTransfer.setDragImage(
                    previewPanelRef.current,
                    0,
                    0,
                  );
                }
                onDragStart?.(event, dragData);
              }
            : undefined
        }
        className={classes.Wrapper}
      >
        <Box className={classes.Title}>{panelKey}</Box>
        <Flex className={classes.PanelPreview}>
          <Box ref={previewPanelRef}>
            {panel.previewPanel ? (
              <PanelCard className={classes.Card} panelComponent={panelKey}>
                {React.createElement(panel.previewPanel)}
              </PanelCard>
            ) : (
              panel.previewPanelDescription || "No description for this panel"
            )}
          </Box>
        </Flex>
      </Flex>
    </PanelProvider>
  );
});

PanelComponentPreview.displayName = "PanelComponentPreview";
