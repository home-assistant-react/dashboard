import React from "react";
import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import {
  BlankPixel,
  EntityPicker,
  EntityPickerDragData,
  Flex,
} from "@home-assistant-react/ui/src";
import { useAddPanelDrawerContext } from "./add-panel-drawer-context";
import {
  useDashboard,
  useDashboardEditor,
  useHassGetEntitiesOnce,
} from "@home-assistant-react/api/src";
import {
  MouseTouchEvent,
  NewPanelDragData,
} from "@home-assistant-react/types/src";
import { setObjectDataTransfer } from "@home-assistant-react/helpers/src/ui/setObjectDataTransfer";
import { EntityPickerDragImage } from "@home-assistant-react/ui/src/components/controls/EntityPicker/EntityPickerDragImage";
import { getSuitablePanelComponentForEntityId } from "@home-assistant-react/helpers/src/panels/getSuitablePanelComponentForEntityId";
import { getMdiIcon } from "@home-assistant-react/icons/src";

const classes = {
  HelperTextContainer:
    "text-sm text-muted py-2.5 px-3 gap-2 bg-muted text-muted-foreground items-center justify-center border-b",
};

export const AddPanelSearchByEntities: React.FC = () => {
  const { startDragging, endDragging, allowDrag, openEditorWhenAdded } =
    useAddPanelDrawerContext();
  const entities = useHassGetEntitiesOnce();
  const { setDraggingPanel, addNewPanel } = useDashboardEditor();
  const [dragData, setDragData] = React.useState<EntityPickerDragData | null>(
    null,
  );
  const { selectedDashboardView } = useDashboard();
  const blankPixelRef = React.useRef<HTMLDivElement | null>(null);
  const dragImageRef = React.useRef<HTMLDivElement | null>(null);

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (!dragImageRef.current?.style) return;
    dragImageRef.current.style.left = `${event.clientX + 20}px`;
    dragImageRef.current.style.top = `${event.clientY + 20}px`;

    const gridPlaceholder = window.document.querySelector(
      ".react-grid-item.react-grid-placeholder",
    );

    if (gridPlaceholder && dragImageRef.current) {
      const boundingRect = gridPlaceholder.getBoundingClientRect();
      dragImageRef.current.style.width = `${boundingRect.width}px`;
      dragImageRef.current.style.height = `${boundingRect.height}px`;
    }
  };

  const handleClick = (_: MouseTouchEvent, entityId: string) => {
    const panelComponent = getSuitablePanelComponentForEntityId(entityId);
    addNewPanel(
      {
        panelComponent,
        panelOptions: { entity_id: entityId },
        viewId: selectedDashboardView || undefined,
      },
      openEditorWhenAdded === true,
    );
  };

  return (
    <>
      {/* Even if the documentation for setDragImage seems possible to use an off-dom element,
        this actually not working. Using this workaround to dynamically set the drag image */}
      <BlankPixel ref={blankPixelRef} />
      {dragData?.panelComponentName && (
        <EntityPickerDragImage
          ref={dragImageRef}
          panelComponentName={dragData?.panelComponentName}
          entityId={dragData.entityId}
        />
      )}
      {allowDrag && (
        <Flex className={classes.HelperTextContainer}>
          {getMdiIcon("informationOutline", { size: 1.5 })}
          You can drag and drop entities from the list below to the grid or
          clicking the `Add this entity` button. In this last case, the panel
          will be added to the grid on the first available spot. The panel
          component will be chosen automatically based on the entity domain. You
          can change it later.
        </Flex>
      )}
      <EntityPicker
        onDragStart={(event, entityId) => {
          const dragData = {
            panelComponentName: getSuitablePanelComponentForEntityId(entityId),
            entityId,
          };
          setDragData(dragData);
          if (blankPixelRef.current)
            event.dataTransfer.setDragImage(blankPixelRef.current, 0, 0);

          setObjectDataTransfer<NewPanelDragData>(event.dataTransfer, {
            type: "new-panel",
            component: dragData.panelComponentName,
            options: {
              entity_id: dragData.entityId,
            },
          });

          const component = getPanelComponent(dragData.panelComponentName);

          setDraggingPanel({
            w: component?.defaultPanelWidth,
            h: component?.defaultPanelHeight,
          });

          startDragging();
        }}
        onDrag={handleDrag}
        onClick={handleClick}
        onDragEnd={endDragging.bind(null, true)}
        entities={entities}
        hasDraggableItems={allowDrag}
        hasAddButton
      />
    </>
  );
};
