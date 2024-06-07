import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useDashboard } from "@home-assistant-react/api/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src";
import { MappedSidebar, Sidebar } from "@home-assistant-react/types/src";
import { Panel, PanelsGroup } from "@home-assistant-react/ui/src";
import React from "react";
import { SidebarSortableItem } from "./SidebarSortableItem";

export interface UseGetMappedSidebarReturn {
  mappedSidebar: MappedSidebar;
  mappedSidebarItems: Record<string, React.ReactNode>;
}

/**
 * A custom hook that generates a mapped version of a sidebar with reordered and repositioned groups,
 * optimized for either columnar or row-wise display. Additionally, it constructs React components for each
 * sidebar item, optimized for drag-and-drop interactions.
 *
 * @param {Sidebar} sidebar - The original sidebar data structure.
 * @param {boolean} [isColumn=false] - Determines the orientation of the sidebar groups; true for columns, false for rows.
 * @returns {UseGetMappedSidebarReturn} An object containing the transformed sidebar and React components for each sidebar item.
 */
export function useGetMappedSidebar(
  sidebar: Sidebar,
  isColumn = false,
): UseGetMappedSidebarReturn {
  const dashboard = useDashboard();
  const mappedSidebar = React.useMemo(() => {
    return {
      ...sidebar,
      groups: sidebar.groups
        .sort((a, b) => {
          if (isColumn) return a.x - b.x;
          return a.y - b.y;
        })
        .map((group, index) => {
          return {
            ...group,
            y: isColumn ? 0 : index,
            x: isColumn ? index : 0,
          };
        }),
      isMapped: true,
      isColumn,
    };
  }, [sidebar.groups, isColumn]);

  const mappedSidebarItems = React.useMemo(() => {
    return mappedSidebar.groups.reduce((previousValue, item) => {
      const panels = item.panels || [];
      if (!panels.length) return previousValue;

      return {
        ...previousValue,
        [item.i]:
          panels.length > 1 ? (
            <SidebarSortableItem key={item.i} id={item.i}>
              <PanelsGroup key={item.i} group={item} sidebar={mappedSidebar} />
            </SidebarSortableItem>
          ) : (
            <SidebarSortableItem key={item.i} id={item.i} isColumn={isColumn}>
              <Panel
                key={item.i}
                group={item}
                panel={getPanelFromDashboardState(dashboard, item.panels[0])}
                sidebar={mappedSidebar}
              />
            </SidebarSortableItem>
          ),
      };
    }, {});
  }, [mappedSidebar]);

  return {
    mappedSidebar,
    mappedSidebarItems,
  };
}

/**
 * Provides drag-and-drop event handlers for managing interactions with a mapped sidebar.
 *
 * @param {MappedSidebar} mappedSidebar - The mapped sidebar object that contains the modified group coordinates and layout information.
 * @returns {Object} Contains the active item's identifier and functions to handle drag start and drag end events.
 *   - activeId: The identifier of the currently active (dragged) element, or null when no drag is active.
 *   - handleDragStart: Function to be called when a drag operation starts, setting the active element.
 *   - handleDragEnd: Function to be called when a drag operation ends. This function handles the rearrangement of the sidebar elements if a valid drag-and-drop operation is completed, updating the sidebar through the dashboard context.
 */
export function useGetSidebarDagAndDropHandlers(mappedSidebar: MappedSidebar) {
  const dashboard = useDashboard();

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const isColumn = mappedSidebar.isColumn;
    const { active, over } = event;

    const activeGroup = mappedSidebar.groups.find(
      (group) => group.i === active.id,
    );
    const overGroup = mappedSidebar.groups.find(
      (group) => group.i === over?.id,
    );

    if (!activeGroup || !overGroup) return;

    if (activeGroup.i !== overGroup.i) {
      const sidebarToSave: Sidebar = { ...mappedSidebar };
      if ("isMapped" in sidebarToSave) delete sidebarToSave.isMapped;
      if ("isColumn" in sidebarToSave) delete sidebarToSave.isColumn;

      dashboard.updateSidebar({
        ...sidebarToSave,
        groups: mappedSidebar.groups.map((group) => {
          if (group.i === active.id) {
            return {
              ...group,
              y: isColumn ? 0 : overGroup.y,
              x: isColumn ? overGroup.x : 0,
            };
          }

          if (group.i === overGroup.i) {
            return {
              ...group,
              y: isColumn ? 0 : activeGroup.y,
              x: isColumn ? activeGroup.x : 0,
            };
          }

          return group;
        }),
      });
    }

    setActiveId(null);
  };

  return {
    activeId,
    handleDragStart,
    handleDragEnd,
  };
}
