import React from "react";
import { EntityPickerProps } from "./EntityPicker.types";
import { Box, Flex } from "../../../primitives/common";
import { getObjectKeys } from "@home-assistant-react/helpers/src";
import {
  getIconFromEntityState,
  getMdiIcon,
} from "@home-assistant-react/icons/src";
import { DebouncedInput } from "../DebouncedInput";
import { VirtualizedList } from "../../data-display";
import { Spinner } from "../../feedback/Spinner";
import { Button } from "../../buttons";
import { MouseTouchEvent } from "@home-assistant-react/types/src";
import { cn } from "../../../helpers";

const classes = {
  LoadingWrapper:
    "items-center justify-center w-full h-full text-sm text-muted-foreground py-2.5 px-3 gap-6 flex-col",
  Wrapper: "w-full h-full flex-col bg-primary-background",
  EntityPickerSearchInputWrapper:
    "rounded-none shadow-none bg-muted border-0 border-b",
  EntityItem:
    "text-sm gap-2 py-2.5 border-b px-3 items-center justify-between cursor-pointer h-[65px] overflow-hidden",
  EntityItemSelected: "bg-muted",
  EntityItemInner: "gap-2 items-center",
  EntityName: "text-primary font-semibold",
  EntityId: "text-muted-foreground",
};

export const EntityPicker = React.forwardRef<HTMLDivElement, EntityPickerProps>(
  (props, ref) => {
    const { entities, hasDraggableItems, hasAddButton } = props;

    const [searchValue, setSearchValue] = React.useState<string>("");

    const filteredEntities = React.useMemo(() => {
      if (!entities) return [];

      const ids = getObjectKeys(entities || {});
      if (!searchValue) return ids;

      const lowerCaseSearchValue = searchValue.toLowerCase();

      return ids.filter((entityId) => {
        if (!searchValue) return true;
        const friendlyName = String(
          entities[entityId]?.attributes?.friendly_name || "",
        ).toLowerCase();
        return (
          friendlyName.includes(lowerCaseSearchValue) ||
          String(entityId).toLowerCase().includes(lowerCaseSearchValue)
        );
      });
    }, [searchValue, !!entities]);

    if (!entities)
      return (
        <Flex className={classes.LoadingWrapper}>
          <Box>Loading entities...</Box>
          <Spinner isIndeterminate />
        </Flex>
      );

    const handleDragStart = (
      entityId: string,
      event: React.DragEvent<HTMLDivElement>,
    ) => {
      props.onDragStart?.(event, entityId);
    };

    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
      props.onDrag?.(event);
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
      props.onDragEnd?.(event);
    };

    const handleClick = (entityId: string, event: MouseTouchEvent) => {
      props.onClick?.(event, entityId);
      props.onSelect?.(entityId);
    };

    let scrollToIndex: number | undefined = undefined;
    if (props.selectedEntityId) {
      scrollToIndex = filteredEntities.findIndex(
        (entityId) => entityId === props.selectedEntityId,
      );
    }

    return (
      <>
        <Flex className={classes.Wrapper} ref={ref}>
          <DebouncedInput
            wrapperClassName={classes.EntityPickerSearchInputWrapper}
            variant={"unstyled"}
            onChangeValue={setSearchValue}
            placeholder={"Search entities"}
            delay={10}
            hideEmptyMessages
          />
          <VirtualizedList
            items={filteredEntities}
            itemHeight={65}
            scrollToIndex={scrollToIndex}
            renderItem={(entityId) => {
              const isSelected =
                props.selectedEntityId && props.selectedEntityId === entityId;
              return (
                <Flex
                  key={entityId}
                  className={cn(
                    classes.EntityItem,
                    isSelected && classes.EntityItemSelected,
                  )}
                  draggable={hasDraggableItems}
                  onDragStart={handleDragStart.bind(null, entityId)}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  onClick={
                    hasAddButton ? undefined : handleClick.bind(null, entityId)
                  }
                >
                  <Flex className={classes.EntityItemInner}>
                    <Box>
                      {getIconFromEntityState(entities[entityId], {
                        size: 1.2,
                      })}
                    </Box>
                    <Box style={{ overflow: "hidden" }}>
                      <Box className={classes.EntityName}>
                        {entities[entityId].attributes.friendly_name}
                      </Box>
                      <Box className={classes.EntityId}>{entityId}</Box>
                    </Box>
                  </Flex>
                  {hasAddButton && (
                    <Button
                      onClick={handleClick.bind(null, entityId)}
                      variant={"outline"}
                    >
                      Add this entity
                    </Button>
                  )}
                  {isSelected && getMdiIcon("check", { size: 0.8 })}
                </Flex>
              );
            }}
          />
        </Flex>
      </>
    );
  },
);

EntityPicker.displayName = "EntityPicker";
