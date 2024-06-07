import {
  useDashboard,
  useDashboardEditor,
} from "@home-assistant-react/api/src";
import {
  DEFAULT_GRID_COLS,
  DEFAULT_GRID_CONTAINER_PADDING_X,
  DEFAULT_GRID_CONTAINER_PADDING_Y,
  DEFAULT_GRID_ITEMS_MARGIN_X,
  DEFAULT_GRID_ITEMS_MARGIN_Y,
  DEFAULT_GRID_PANEL_H,
  DEFAULT_GRID_PANEL_W,
  DEFAULT_GRID_ROWS_HEIGHT,
} from "@home-assistant-react/defines/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src";
import { useBreakpoint } from "@home-assistant-react/hooks/src";
import { DashboardView } from "@home-assistant-react/types/src";
import { Panel, PanelsGroup } from "@home-assistant-react/ui/src";
import React from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import {
  mapChangedLayout,
  onPanelsGridResize,
  useGridLayoutDropCallback,
} from "./helpers";

const ReactGridLayout = WidthProvider(GridLayout);

export interface DashboardGridLayoutProps {
  view: DashboardView;
}

export const DashboardGridLayout: React.FC<DashboardGridLayoutProps> = ({
  view,
}) => {
  const dashboard = useDashboard();
  const { isArranging, draggingPanel } = useDashboardEditor();
  const isSmBreakpoint = useBreakpoint("sm");
  const handleDrop = useGridLayoutDropCallback(view);

  const handleLayoutChange = async (layout: GridLayout.Layout[]) => {
    if (isArranging.value && dashboard && isSmBreakpoint) {
      await dashboard.updateState(mapChangedLayout(layout, dashboard, view));
    }
  };

  let layout = view?.layout;

  if (view && !isSmBreakpoint && layout) {
    layout = layout.map((l) => {
      return {
        ...l,
        x: 0,
        y: 0,
        w: view.gridOptions?.columns || DEFAULT_GRID_COLS,
      };
    });
  }

  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      onResize={onPanelsGridResize}
      onLayoutChange={handleLayoutChange}
      isDraggable={isArranging.value}
      isResizable={isArranging.value}
      cols={view.gridOptions?.columns || DEFAULT_GRID_COLS}
      rowHeight={view.gridOptions?.rowsHeight || DEFAULT_GRID_ROWS_HEIGHT}
      margin={[
        view.gridOptions?.itemsMarginX || DEFAULT_GRID_ITEMS_MARGIN_X,
        view.gridOptions?.itemsMarginY || DEFAULT_GRID_ITEMS_MARGIN_Y,
      ]}
      containerPadding={[
        view.gridPaddingHorizontal !== undefined
          ? Number(view.gridPaddingHorizontal)
          : DEFAULT_GRID_CONTAINER_PADDING_X,
        view.gridPaddingVertical !== undefined
          ? Number(view.gridPaddingVertical)
          : DEFAULT_GRID_CONTAINER_PADDING_Y,
      ]}
      isDroppable={!!draggingPanel}
      droppingItem={{
        i: draggingPanel?.i || "no-id",
        w: draggingPanel?.w || DEFAULT_GRID_PANEL_W,
        h: draggingPanel?.h || DEFAULT_GRID_PANEL_H,
      }}
      useCSSTransforms={true}
      onDrop={handleDrop}
    >
      {view?.layout?.map((item) => {
        const panels = item.panels || [];
        if (!panels.length) return null;

        if (panels.length > 1 || item.groupOptions?.groupType === "grid") {
          return <PanelsGroup key={item.i} group={item} />;
        }

        return (
          <Panel
            key={item.i}
            group={item}
            panel={getPanelFromDashboardState(dashboard, item.panels[0])}
            view={view}
          />
        );
      })}
    </ReactGridLayout>
  );
};
