import React, { PropsWithChildren } from "react";
import { Box, Flex } from "../../primitives/common";
import { ThemeToggle } from "../layout/ThemeToggle";

export interface FullPageContainerProps extends PropsWithChildren {}

export const FullPageContainer: React.FC<FullPageContainerProps> = ({
  children,
}) => {
  return (
    <Flex className={"w-screen h-screen items-center flex-col"}>
      <Flex className={"justify-end w-full pt-10 px-10"}>
        <ThemeToggle />
      </Flex>
      <Box className={"w-full flex-grow overflow-auto p-10"}>{children}</Box>
    </Flex>
  );
};
