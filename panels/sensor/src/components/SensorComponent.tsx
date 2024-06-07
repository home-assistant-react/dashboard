import { usePanel } from "@home-assistant-react/api/src";
import { getIconFromEntityState } from "@home-assistant-react/icons/src";
import { HassEntityState } from "@home-assistant-react/types/src";
import { Box, Flex } from "@home-assistant-react/ui/src";
import React from "react";

const classes = {
  WrapperVertical: "items-center justify-start p-1 w-full h-full",
  WrapperHorizontal: "items-center justify-start px-6 py-1 w-full h-full",
  Icon: "pr-4",
  Name: "text-xs text-secondary-foreground",
};

export const SensorComponent: React.FC<{
  entity?: HassEntityState<unknown>;
}> = ({ entity }) => {
  const icon = entity
    ? getIconFromEntityState(entity, { size: "32px" })
    : undefined;

  const panel = usePanel();
  const isHorizontal =
    panel?.sidebar?.position === "top" || panel?.sidebar?.position === "bottom";

  return (
    <Flex
      className={
        isHorizontal ? classes.WrapperVertical : classes.WrapperHorizontal
      }
    >
      <Box className={classes.Icon}>{icon}</Box>
      <Box>
        <Box>
          {entity?.state} {entity?.attributes?.unit_of_measurement}
        </Box>
        <Box className={classes.Name}>{entity?.attributes?.friendly_name}</Box>
      </Box>
    </Flex>
  );
};
