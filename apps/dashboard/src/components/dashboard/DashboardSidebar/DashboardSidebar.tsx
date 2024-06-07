import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDashboardEditor } from "@home-assistant-react/api/src";
import { Sidebar } from "@home-assistant-react/types/src";
import { SidebarContextMenu } from "@home-assistant-react/ui/src/editor/components/SidebarContextMenu/SidebarContextMenu";
import React from "react";
import {
  useGetMappedSidebar,
  useGetSidebarDagAndDropHandlers,
} from "./helpers";
import { SidebarWrapper } from "./SidebarWrapper";

export interface DashboardSidebarProps {
  sidebar: Sidebar;
  isColumn?: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebar,
  isColumn,
}) => {
  const { isArranging } = useDashboardEditor();
  const { mappedSidebar, mappedSidebarItems } = useGetMappedSidebar(
    sidebar,
    isColumn,
  );
  const { handleDragStart, handleDragEnd, activeId } =
    useGetSidebarDagAndDropHandlers(mappedSidebar);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
      autoScroll={{
        enabled: true,
      }}
    >
      <SidebarContextMenu sidebar={mappedSidebar}>
        <SidebarWrapper
          isColumn={isColumn}
          size={mappedSidebar.size || 10}
          position={mappedSidebar.position}
        >
          <SortableContext
            disabled={!isArranging.value}
            items={mappedSidebar.groups.map((item) => item.i)}
            strategy={
              isColumn
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy
            }
          >
            {Object.values(mappedSidebarItems)}
          </SortableContext>
        </SidebarWrapper>
      </SidebarContextMenu>
      <DragOverlay>
        {activeId ? <>{mappedSidebarItems[activeId]}</> : null}
      </DragOverlay>
    </DndContext>
  );
};
