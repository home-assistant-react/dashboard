import { useDashboard } from "@home-assistant-react/api/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src";
import { defaultGroupOptions } from "@home-assistant-react/types/src/panels/panels-group-options";
import React from "react";
import { Flex, Grid } from "../../../../primitives/common";
import { IconFromSet } from "../../../controls/IconPicker/IconFromSet";
import { Panel } from "../Panel";
import { PanelsGroupProps } from "./PanelsGroup.types";

export const PanelsGroupGrid = React.forwardRef<
  HTMLDivElement,
  PanelsGroupProps
>((props, ref) => {
  const { group } = props;
  const panels = group.panels || [];
  const dashboard = useDashboard();

  const gridColumns =
    group.groupOptions?.gridColumns || defaultGroupOptions.gridColumns;
  const gridTitleIcon = group.groupOptions?.gridTitleIcon;
  const gridTitle = group.groupOptions?.gridTitle || "";

  return (
    <Flex className={"w-full h-full flex-col"}>
      {(gridTitle || gridTitleIcon) && (
        <Flex className={"gap-2 text-3xl px-4 py-2 items-center"}>
          {gridTitleIcon && <IconFromSet icon={gridTitleIcon} />}
          {gridTitle}
        </Flex>
      )}
      <Grid
        ref={ref}
        style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        className={"flex-grow"}
      >
        {panels.map((panelId, panelIndex) => {
          const panel = getPanelFromDashboardState(dashboard, panelId);
          return (
            <Panel
              panel={panel}
              group={group}
              sidebar={props.sidebar}
              key={`${panelIndex}`}
              isInGroup
            />
          );
        })}
      </Grid>
    </Flex>
  );
});

PanelsGroupGrid.displayName = "PanelsGroupGrid";
