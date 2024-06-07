import { useScriptEntity } from "@home-assistant-react/hooks/src/entities/useScriptEntity";
import { Panel } from "@home-assistant-react/types/src";
import { Box, Flex } from "@home-assistant-react/ui/src";
import { IconFromSet } from "@home-assistant-react/ui/src/components/controls/IconPicker/IconFromSet";
import { Spinner } from "@home-assistant-react/ui/src/components/feedback/Spinner";
import React from "react";
import { actionPanelGetIcon } from "../defines/get-icon";
import { ActionButton } from "./ActionButton";

export interface ActionScriptProps {
  panel: Panel;
}

export const ActionScript: React.FC<ActionScriptProps> = ({ panel }) => {
  const options = panel.options;
  const entityId = options?.entity_id || "";
  const entity = useScriptEntity(entityId);

  const icon = actionPanelGetIcon(entity, { panel });
  const isOn = entity?.state === "on";

  const handleAction = async () => {
    if (isOn) {
      await entity?.stop();
      return;
    }

    await entity?.start();
  };

  if (!entity) return <>NO ENTITY ADD ICON</>;

  return (
    <ActionButton panel={panel} onAction={handleAction}>
      <Box>{icon}</Box>
      <Box>{options?.custom_label || entity.attributes.friendly_name}</Box>
      {isOn && (
        <Flex
          className={
            "absolute inset-0 bg-black/50 items-center justify-center text-white/80 gap-4 backdrop-blur"
          }
        >
          <Spinner size={6} className={"fill-white text-white/50 w-4 h-4"} />
          <IconFromSet icon={{ set: "mdi", icon: "mdiStop" }} size={6} />
        </Flex>
      )}
    </ActionButton>
  );
};
