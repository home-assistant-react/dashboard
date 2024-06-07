import React from "react";
import { EntityPickerInputProps } from "./EntityPickerInput.types";
import { FormControlWrapper } from "../../form";
import { Box, Flex } from "../../../primitives/common";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import { EntityPicker } from "../EntityPicker";
import { getIconFromEntityState } from "@home-assistant-react/icons/src";

const classes = {
  Wrapper: "w-full h-full min-h-11",
  SelectedEntity: "items-center",
  EntityValueWrapper:
    "overflow-hidden text-ellipsis flex-grow whitespace-nowrap",
  EntityName: "text-primary text-sm font-semibold",
  EntityValue: "text-muted-foreground text-xs",
  PopoverContent: "p-0 w-[550px] h-[400px]",
  PopoverArrow: "fill-muted",
};

export const EntityPickerInput = React.forwardRef<
  HTMLDivElement,
  EntityPickerInputProps
>((props, ref) => {
  const popover = useDisclosure();
  const { entities, entityPickerProps, ...rest } = props;
  const [value, setValue] = React.useState(String(""));
  const handleSelectEntity = (entityId: string) => {
    setValue(entityId);
    props?.onValueChange?.(entityId);
    popover.close();
  };
  const _value = props.value !== undefined ? props.value : value;
  const selectedEntity = entities?.[_value];

  return (
    <Popover open={popover.isOpen} onOpenChange={popover.onOpenChange}>
      <PopoverTrigger className={"w-full"}>
        <FormControlWrapper
          wrapperClassName={classes.Wrapper}
          ref={ref}
          {...rest}
        >
          {selectedEntity && (
            <Flex className={classes.SelectedEntity}>
              <Box>
                {getIconFromEntityState(selectedEntity, {
                  size: 1.2,
                })}
              </Box>
              <Box className={classes.EntityValueWrapper}>
                <Box className={classes.EntityName}>
                  {selectedEntity.attributes.friendly_name}
                </Box>
                <Box className={classes.EntityValue}>{_value}</Box>
              </Box>
            </Flex>
          )}
        </FormControlWrapper>
      </PopoverTrigger>
      <PopoverContent
        arrowProps={{ className: classes.PopoverArrow }}
        className={classes.PopoverContent}
      >
        <EntityPicker
          onSelect={handleSelectEntity}
          entities={entities}
          selectedEntityId={value}
          {...entityPickerProps}
        />
      </PopoverContent>
    </Popover>
  );
});

EntityPickerInput.displayName = "EntityPickerInput";
