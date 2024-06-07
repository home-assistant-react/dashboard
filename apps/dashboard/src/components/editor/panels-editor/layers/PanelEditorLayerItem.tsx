import { LayerData } from "@home-assistant-react/types/src/editor/layer-data";
import React from "react";
import {
  useDashboardEditor,
  useHassGetEntity,
  usePanelEditor,
} from "@home-assistant-react/api/src";
import {
  EditingData,
  LayerDragData,
  LayerGroupDragData,
  PanelFC,
} from "@home-assistant-react/types/src";
import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import {
  logError,
  setObjectDataTransfer,
} from "@home-assistant-react/helpers/src";
import { Layer } from "@home-assistant-react/ui/src/editor";

export interface PanelEditorLayerItemProps {
  layer: LayerData;
  updateEditingData: (data?: EditingData) => void;
  searchValue?: string;
  dragData?: LayerDragData | LayerGroupDragData;
  setDragData?: (data?: LayerDragData | LayerGroupDragData) => void;
  positionInGroup: number;
}

export const PanelEditorLayerItem = React.forwardRef<
  HTMLDivElement,
  PanelEditorLayerItemProps
>(
  (
    {
      layer,
      positionInGroup,
      dragData,
      setDragData,
      searchValue,
      updateEditingData,
    },
    ref,
  ) => {
    const { panel, movePanelToGroup } = usePanelEditor();
    const { startAdding, panelsEditorDisclosure } = useDashboardEditor();

    const entity = useHassGetEntity(layer?.panel?.options?.entity_id);
    let panelComponent: PanelFC | undefined;

    try {
      panelComponent = layer?.panel?.component
        ? getPanelComponent(layer?.panel?.component)
        : undefined;
    } catch (e) {
      logError(e);
    }

    const isSelected = layer?.panel?.id === panel?.id;
    const label =
      (!!entity &&
        panelComponent?.getLabel?.(entity, {
          panel: isSelected ? panel : layer?.panel,
        })) ||
      entity?.attributes?.friendly_name ||
      layer?.panel?.component;

    const labelLowerCase = String(label).toLowerCase();

    return (
      <Layer
        ref={ref}
        ids={[`panel-${layer.panel.id}`]}
        key={`panel-${layer.panel.id}`}
        isHidden={
          searchValue && !isSelected
            ? !labelLowerCase.includes(searchValue.toLowerCase())
            : false
        }
        isRemoved={layer.isRemoved}
        onDragStart={(event) => {
          const dragData: LayerDragData = {
            type: "layer",
            panelId: layer.panel.id,
            groupId: layer.groupId,
            viewId: panelsEditorDisclosure.data?.viewId,
          };
          setObjectDataTransfer<LayerDragData>(event.dataTransfer, dragData);
          setDragData?.(dragData);
        }}
        onDrop={(dragData, droppedAfter) => {
          // eslint-disable-next-line no-console
          movePanelToGroup(dragData.panelId, layer.groupId, {
            afterPanelId: droppedAfter ? layer.panel.id : undefined,
            beforePanelId: droppedAfter ? undefined : layer.panel.id,
            fromViewId: dragData.viewId,
            toViewId: dragData.viewId,
          });
        }}
        onClick={() => {
          updateEditingData({
            panelId: layer.panel.id,
            groupId: layer.groupId,
            options: layer.panel.options,
          });
        }}
        isSelected={isSelected}
        icon={panelComponent?.getIcon?.(entity, {
          size: "24px",
          panel: isSelected ? panel : layer?.panel,
        })}
        label={label}
        depth={layer.depth}
        dragData={dragData}
        setDragData={setDragData}
        positionInGroup={positionInGroup}
        onAdd={
          panelComponent?.isGroupPanel
            ? () => {
                if (!layer?.panel?.id) return;
                startAdding({
                  targetId: layer.panel.id,
                  openEditorWhenAdded: true,
                });
              }
            : undefined
        }
      />
    );
  },
);

PanelEditorLayerItem.displayName = "PanelEditorLayerItem";
