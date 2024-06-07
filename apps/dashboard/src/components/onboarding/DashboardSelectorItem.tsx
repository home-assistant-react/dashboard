import { DashboardsListItem } from "@home-assistant-react/types/src/api/dashboards";
import { Box, Flex } from "@home-assistant-react/ui/src";
import { Card } from "@home-assistant-react/ui/src/components/data-display/Card";
import React from "react";

export interface DashboardSelectorItemProps {
  dashboard: DashboardsListItem;
  onClick?: (dashboard: DashboardsListItem) => void;
}

export const DashboardSelectorItem: React.FC<DashboardSelectorItemProps> = ({
  dashboard,
  onClick,
}) => {
  return (
    <Card
      className={"flex-col gap-1 hover:bg-muted cursor-pointer"}
      onClick={() => onClick?.(dashboard)}
    >
      <Flex className={"font-semibold text-lg justify-between items-center"}>
        {dashboard.name}
        <Box className={"text-xs text-muted-foreground"}>
          {dashboard.createdAt}
        </Box>
      </Flex>
      <Box className={"text-sm text-muted-foreground"}>
        {dashboard.description}
      </Box>
    </Card>
  );
};
