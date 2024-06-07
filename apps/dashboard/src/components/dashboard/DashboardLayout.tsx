import { useHass } from "@home-assistant-react/api/src";
import { Flex } from "@home-assistant-react/ui/src";
import { DashboardContextMenu } from "@home-assistant-react/ui/src/editor/components/DashboardContextMenu/DashboardContextMenu";
import React from "react";
import { DashboardGrid } from "./dashboard-grid/DashboardGrid";
import { DashboardSidebar } from "./DashboardSidebar/DashboardSidebar";
import { useGetDashboardSidebars } from "./helpers";

const classes = {
  Wrapper: "flex-col w-screen h-screen",
  Content: "w-full flex-grow",
};

export const DashboardLayout: React.FC = () => {
  const hass = useHass();
  const sidebars = useGetDashboardSidebars();

  return (
    <Flex className={classes.Wrapper}>
      {sidebars.top.map((sidebar) => (
        <DashboardSidebar key={sidebar.id} sidebar={sidebar} isColumn />
      ))}
      <Flex className={classes.Content} style={{ height: "1px" }}>
        {sidebars.left.map((sidebar) => (
          <DashboardSidebar key={sidebar.id} sidebar={sidebar} />
        ))}
        <Flex className={"w-full h-full flex-col"}>
          <DashboardContextMenu dashboard={hass.loadedDashboard}>
            <Flex className={"flex-grow"}>
              <DashboardGrid />
            </Flex>
          </DashboardContextMenu>
        </Flex>
        {sidebars.right.map((sidebar) => (
          <DashboardSidebar key={sidebar.id} sidebar={sidebar} />
        ))}
      </Flex>
      {sidebars.bottom.map((sidebar) => (
        <DashboardSidebar key={sidebar.id} sidebar={sidebar} isColumn />
      ))}
    </Flex>
  );
};
