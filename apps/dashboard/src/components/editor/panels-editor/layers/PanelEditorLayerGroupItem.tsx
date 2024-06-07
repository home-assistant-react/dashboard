import React from "react";
import {
  useDashboard,
  useDashboardEditor,
  useHassGetEntity,
  usePanelEditor,
} from "@home-assistant-react/api/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src/panels/getPanelFromDashboardState";
import {
  EditingData,
  LayerDragData,
  LayerGroupDragData,
  PanelFC,
  PanelsGroup,
} from "@home-assistant-react/types/src";
import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import { logError } from "@home-assistant-react/helpers/src";
import { Layer } from "@home-assistant-react/ui/src/editor";

export interface PanelEditorLayerGroupItemProps {
  layout: PanelsGroup;
  updateEditingData: (data?: EditingData) => void;
  searchValue?: string;
  dragData?: LayerDragData | LayerGroupDragData;
  setDragData?: (data?: LayerDragData | LayerGroupDragData) => void;
}

export const PanelEditorLayerGroupItem = React.forwardRef<
  HTMLDivElement,
  PanelEditorLayerGroupItemProps
>(({ layout, searchValue, updateEditingData }, ref) => {
  const dashboard = useDashboard();
  const hasOnePanel = layout.panels.length === 1;
  const { startAdding } = useDashboardEditor();
  const { panel } = usePanelEditor();
  const panelZero = getPanelFromDashboardState(dashboard, layout.panels[0]);
  const entity = useHassGetEntity(
    hasOnePanel ? panelZero?.options?.entity_id : undefined,
  );
  let firstPanelComponent: PanelFC | undefined;

  try {
    firstPanelComponent = panelZero?.component
      ? getPanelComponent(panelZero.component)
      : undefined;
  } catch (e) {
    logError(e);
  }

  const isSelected = layout.panels.some((panelId) => panelId === panel?.id);

  const label = hasOnePanel
    ? (!!entity &&
        firstPanelComponent?.getLabel?.(entity, {
          panel: isSelected ? panel : panelZero,
        })) ||
      entity?.attributes?.friendly_name ||
      panelZero?.component
    : `Group (${layout.panels.length})`;

  const labelLowerCase = String(label).toLowerCase();

  return (
    <Layer
      ref={ref}
      ids={[`group-${layout.i}`, panelZero?.id ? `panel-${panelZero.id}` : ""]}
      key={`group-${layout.i}`}
      onClick={() => {
        if (!layout?.panels?.[0]) return;
        updateEditingData({
          panelId: panelZero.id,
          groupId: layout.i,
          options: panelZero.options,
        });
      }}
      onAdd={() => {
        startAdding({ targetId: layout.i, openEditorWhenAdded: true });
      }}
      icon={firstPanelComponent?.getIcon?.(entity, {
        size: "24px",
        panel: isSelected ? panel : panelZero,
      })}
      isHidden={
        searchValue && !isSelected
          ? !labelLowerCase.includes(searchValue.toLowerCase())
          : false
      }
      isSelected={isSelected}
      label={label}
    />
  );
});

PanelEditorLayerGroupItem.displayName = "PanelEditorLayerGroupItem";
