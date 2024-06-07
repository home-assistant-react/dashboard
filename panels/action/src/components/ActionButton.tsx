import { Panel } from "@home-assistant-react/types/src";
import { Flex } from "@home-assistant-react/ui/src";
import React, { PropsWithChildren } from "react";

export interface ActionButtonProps extends PropsWithChildren {
  panel: Panel;
  onAction: () => Promise<void>;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onAction,
  children,
}) => {
  return (
    <Flex
      className={"items-center justify-center w-full h-full gap-2 relative"}
      onClick={onAction}
    >
      {children}
    </Flex>
  );
};
