import React from "react";
import { PanelContentProps } from "./PanelContent.types";
import { PanelCard } from "../PanelCard";
import { Box } from "../../../../primitives/common";
import { getPanelComponentOrFallback } from "@home-assistant-react/helpers/src/panels/getPanelComponentOrFallback";
import { PanelEditButton } from "../PanelEditButton";
import { useDashboardEditor } from "@home-assistant-react/api/src/hooks/providers/useDashboardEditor";
import { PanelContextMenu } from "../../../../editor/components/PanelContextMenu";
import { usePanel } from "@home-assistant-react/api/src";

export const PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(
  (props, ref) => {
    const { group, isInGroup, panel } = props;
    const { isPreview, sidebar } = usePanel();

    const dashboardEditor = useDashboardEditor();
    const ContentComponent = getPanelComponentOrFallback(panel.component);

    const { isArranging, startPanelEditing } = dashboardEditor;

    const handleEditClick = () => {
      startPanelEditing({
        panelId: panel.id,
        group: group,
        //groupId: group.i,
        options: panel.options,
      });
    };

    return (
      <PanelCard
        group={group}
        isInGroup={isInGroup}
        panelId={panel.id}
        panelComponent={panel.component}
        ref={ref}
        data-arranging={isArranging.value}
      >
        <PanelContextMenu
          group={group}
          panel={panel}
          sidebar={sidebar}
          isDisabled={ContentComponent.enabledContextMenu === false}
        >
          <Box className={"w-full flex-grow"}>
            <ContentComponent
              panel={panel}
              group={group}
              isGrouped={isInGroup || false}
            />
            {isArranging.value && !isPreview && (
              <Box className={"absolute inset-0 z-[10]"} />
            )}
          </Box>
        </PanelContextMenu>
        {isArranging.value && <PanelEditButton onClick={handleEditClick} />}
      </PanelCard>
    );
  },
);

PanelContent.displayName = "PanelContent";
