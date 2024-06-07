import React from "react";
import { PanelFC } from "@home-assistant-react/types/src";
import { StackOptions } from "./types";
import { Box, cn } from "@home-assistant-react/ui/src";
import Scrollbars from "react-custom-scrollbars";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src/panels/getPanelFromDashboardState";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { useDashboard } from "@home-assistant-react/api/src";
import { getPanelComponentOrFallback } from "@home-assistant-react/helpers/src/panels/getPanelComponentOrFallback";

export const Stack: PanelFC<StackOptions> = (props) => {
  const dashboard = useDashboard();

  const items = (
    <>
      {props.panel?.options?.panels?.map((panelId, panelKey) => {
        const panel = getPanelFromDashboardState(dashboard, panelId);
        const ContentComponent = getPanelComponentOrFallback(panel.component);

        return (
          <Box
            key={`panel-group-${panelKey}-${panel.id}`}
            className={cn(`panel-${panel.id}`)}
            style={{
              ...ContentComponent.panelInitialStyle,
              ...panel?.options?.style,
            }}
          >
            <ContentComponent
              panel={
                panel.component === "Stack"
                  ? {
                      ...panel,
                      options: { ...panel?.options, isInStack: true },
                    }
                  : panel
              }
              group={props.group}
              isGrouped
            />
          </Box>
        );
      })}
    </>
  );

  if (props.panel?.options?.isInStack) return items;

  return <Scrollbars style={{ height: "100%" }}>{items}</Scrollbars>;
};

Stack.getIcon = (_, options) => getMdiIcon("menu", options);

Stack.previewPanelDescription = "A panel that can contain other panels";
Stack.isGroupPanel = true;

Stack.configOptions = {};
