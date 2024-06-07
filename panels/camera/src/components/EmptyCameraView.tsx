import { Flex } from "@home-assistant-react/ui/src";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";
import React from "react";

export const EmptyCameraView: React.FC = () => {
  return (
    <Flex className={"w-full h-full items-center justify-center"}>
      <Icon name={"VideoOff"} />
    </Flex>
  );
};
