import { Panel } from "@home-assistant-react/types/src";
import { Box } from "@home-assistant-react/ui/src";
import React from "react";
import { actionPanelGetIcon } from "../defines/get-icon";
import { actionPanelGetLabel } from "../defines/get-label";
import { ActionButton } from "./ActionButton";

export interface ActionScriptProps {
  panel: Panel;
}

export const ActionNoEntity: React.FC<ActionScriptProps> = ({ panel }) => {
  const icon = actionPanelGetIcon(undefined, { panel });

  return (
    <ActionButton panel={panel} onAction={async () => undefined}>
      <Box>{icon}</Box>
      <Box>{actionPanelGetLabel(undefined, { panel })}</Box>
    </ActionButton>
  );
};
