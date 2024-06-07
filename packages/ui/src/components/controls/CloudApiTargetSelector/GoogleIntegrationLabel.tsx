import { getMdiIcon } from "@home-assistant-react/icons/src";
import { CloudIntegration } from "@home-assistant-react/types/src/api";
import React from "react";
import { Box, Flex } from "../../../primitives/common";
import { Avatar } from "../../media";

const classes = {
  SelectItem: "gap-2 items-center whitespace-nowrap overflow-hidden w-full",
  SelectItemName: "items-center justify-center gap-2",
  Avatar: "w-6 h-6",
};

export const GoogleIntegrationLabel: React.FC<{
  integration: CloudIntegration;
}> = ({ integration }) => {
  return (
    <Flex className={classes.SelectItem}>
      <Box>{getMdiIcon("google", { color: "#db4437" })} </Box>
      <Flex className={classes.SelectItemName}>
        <Avatar
          className={classes.Avatar}
          src={integration.userInfo?.picture}
          name={
            integration.userInfo?.name ||
            `${integration.userInfo?.given_name} ${integration.userInfo?.family_name}`
          }
        />
        <Box>
          {integration.userInfo?.name ||
            `${integration.userInfo?.given_name} ${integration.userInfo?.family_name}`}
        </Box>
        <Box>{integration.userInfo?.email}</Box>
      </Flex>
    </Flex>
  );
};
