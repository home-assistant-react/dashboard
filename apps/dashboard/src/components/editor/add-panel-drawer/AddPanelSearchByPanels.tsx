import React from "react";
import { Flex, Grid } from "@home-assistant-react/ui/src";
import {
  PanelComponentPreview,
  PanelComponentPreviewProps,
} from "@home-assistant-react/ui/src/editor";
import { Scrollbars } from "react-custom-scrollbars";
import {
  getObjectKeys,
  setObjectDataTransfer,
} from "@home-assistant-react/helpers/src";
import {
  getDashboardWindowStore,
  getPanelComponent,
} from "@home-assistant-react/api/src/dashboard";
import { useAddPanelDrawerContext } from "./add-panel-drawer-context";
import { NewPanelDragData } from "@home-assistant-react/types/src";
import { useDashboardEditor } from "@home-assistant-react/api/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";

const classes = {
  HelperTextContainer:
    "text-sm text-muted-foreground py-2.5 px-3 gap-2 bg-muted border-b items-center justify-center",
};

export const AddPanelSearchByPanels: React.FC = () => {
  const { startDragging, endDragging, allowDrag, openEditorWhenAdded } =
    useAddPanelDrawerContext();
  const panels = getDashboardWindowStore().getLoadedPanels();
  const { setDraggingPanel, addNewPanel } = useDashboardEditor();
  const availablePanels = getObjectKeys(panels).filter(
    (panelKey) => panelKey !== "Fallback",
  );

  const handleStartDrag: PanelComponentPreviewProps["onDragStart"] = (
    event,
    dragData,
  ) => {
    if (!dragData) return;

    setObjectDataTransfer<NewPanelDragData>(event.dataTransfer, {
      ...dragData,
      openEdit: openEditorWhenAdded !== false,
    });

    const component = getPanelComponent(dragData.component);

    setDraggingPanel({
      w: component?.defaultPanelWidth,
      h: component?.defaultPanelHeight,
    });

    setTimeout(startDragging, 200);
  };

  return (
    <>
      {allowDrag && (
        <Flex className={classes.HelperTextContainer}>
          {getMdiIcon("informationOutline", { size: 1.5 })}
          You can drag and drop panels from the list below to the grid or click
          on the preview to add a new panel. In this last case, the panel will
          be added to the grid on the first available spot. The panel editor
          will be opened automatically.
        </Flex>
      )}
      <Scrollbars style={{ height: "100%" }}>
        <Grid className={"gap-2 p-6 grid-cols-2"}>
          {availablePanels.map((panelKey) => (
            <PanelComponentPreview
              key={`panel-card-${panelKey}`}
              draggable={allowDrag}
              unselectable="on"
              onDragStart={allowDrag ? handleStartDrag : undefined}
              onDragEnd={allowDrag ? endDragging.bind(null, true) : undefined}
              panel={panels[panelKey]}
              panelKey={panelKey}
              onClick={() => {
                addNewPanel({ panelComponent: panelKey }, true);
              }}
            />
          ))}
        </Grid>
      </Scrollbars>
    </>
  );
};
