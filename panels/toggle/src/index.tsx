import React from "react";
import { Box, Flex, Switch } from "@home-assistant-react/ui/src";
import {
  getDomainIcon,
  getIconFromEntityState,
  Icon,
} from "@home-assistant-react/icons/src";
import {
  useHassGetEntitiesOnce,
  useHassGetEntity,
} from "@home-assistant-react/api/src/hooks";
import {
  EditorPropertyType,
  HassEntityState,
  PanelFC,
} from "@home-assistant-react/types/src";
import { ToggleOptions } from "./types";
import { useToggleServices } from "@home-assistant-react/api/src/services/toggle";
import { getDomainFromEntityId } from "@home-assistant-react/helpers/src/home-assistant";
import { getRandomObjectValue } from "@home-assistant-react/helpers/src/objects/getRandomObjectValue";
import { useIndeterminate } from "@home-assistant-react/hooks/src/use-indeterminate/useIndeterminate";

interface ToggleComponentProps {
  onClick?: () => void;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  entityName?: string;
  icon?: React.ReactNode;
}

const classes = {
  Wrapper: "w-full h-full px-6 py-1 items-center",
  InfoContainer: "w-full items-center",
  Name: "flex-grow text-md leading-3",
};

const ToggleComponent: React.FC<ToggleComponentProps> = (props) => {
  return (
    <Flex
      className={classes.Wrapper}
      onClick={props.onClick}
      style={{ opacity: props.isIndeterminate ? 0.5 : 1 }}
    >
      <Box className={"w-full"}>
        <Flex className={classes.InfoContainer}>
          <Box>{props.icon}</Box>
          <Box className={classes.Name}>{props.entityName || " "}</Box>
          <Box>
            <Switch checked={props.isChecked} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export const Toggle: PanelFC<ToggleOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const entity = useHassGetEntity(entityId);
  const isOn = entity?.state === "on";
  const toggle = useToggleServices(entity);
  const icon = entity
    ? getIconFromEntityState(entity, { size: "28px" })
    : undefined;
  const { isIndeterminate, activate: activateIndeterminate } =
    useIndeterminate(isOn);

  return (
    <ToggleComponent
      onClick={async () => {
        activateIndeterminate();
        await toggle[isOn ? "turnOff" : "turnOn"]();
      }}
      isChecked={isOn}
      isIndeterminate={isIndeterminate}
      icon={icon}
      entityName={entity?.attributes.friendly_name || ""}
    />
  );
};

Toggle.getIcon = (entity, options) =>
  entity ? (
    <Icon
      path={getDomainIcon(getDomainFromEntityId(entity?.entity_id), entity)}
      size={options?.size || "16px"}
    />
  ) : undefined;

Toggle.previewPanel = (() => {
  const entities = useHassGetEntitiesOnce({ domain: "switch" });
  const randomEntity = entities
    ? getRandomObjectValue<HassEntityState>(entities)
    : undefined;

  return (
    <ToggleComponent
      entityName={randomEntity?.attributes?.friendly_name || "Entity name"}
    />
  );
}) as React.FC;

Toggle.isPushButton = true;

Toggle.configOptions = {
  customOptions: [
    {
      title: "Target",
      options: [
        {
          type: EditorPropertyType.Entity,
          name: "entity_id",
          label: "target_entity",
        },
      ],
    },
  ],
};
