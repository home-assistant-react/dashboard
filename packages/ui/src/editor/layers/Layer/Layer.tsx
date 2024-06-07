import React from "react";
import { cn } from "../../../helpers";
import { LayerProps } from "./Layer.types";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { Button } from "../../../components";
import { Box, Flex, Grid } from "../../../primitives/common";
import {
  booleanDataAttr,
  getObjectDataTransfer,
} from "@home-assistant-react/helpers/src";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { LayerDragData } from "@home-assistant-react/types/src";

const classes = {
  Layer:
    "w-full gap-1 select-none relative items-center justify-center cursor-pointer whitespace-nowrap text-ellipsis h-[45px] " +
    "bg-muted data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
  LayerHidden: "hidden",
  Icon: "py-2.5",
  Label: "p-2.5 max-w-fit w-full text-sm overflow-hidden text-ellipsis",
  OptionsContainer: "border-l h-full items-center",
};

export const Layer = React.forwardRef<HTMLDivElement, LayerProps>(
  (props, ref) => {
    const isDropCursorActive = useBooleanValue();
    const [dropSide, setDropSide] = React.useState<"up" | "down">("down");
    const {
      onClick,
      onAdd,
      isRemoved,
      isSelected,
      depth = 0,
      label,
      icon,
      ids,
      isHidden,
    } = props;
    const id = (ids || [])
      .filter((id) => id)
      .map((id) => `layer-item-${id}`)
      .join(" ");
    const isFirstItem = props.positionInGroup === 0;

    const layerItemClassNames = cn(
      "gap-1 w-full pr-2 grid-cols-[auto_1fr_auto] items-center",
    );

    return (
      <Flex
        draggable={depth > 0}
        ref={ref}
        key={id}
        onClick={onClick}
        data-selected={isSelected}
        data-removed={isRemoved}
        data-hidden={booleanDataAttr(isHidden)}
        className={[classes.Layer, id, isHidden && classes.LayerHidden]}
        style={{
          paddingLeft: `${10 + depth * 2}px`,
          borderLeftWidth: depth ? `${depth * 10}px` : undefined,
        }}
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = "move";
          props.onDragStart?.(event);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";

          if (props.positionInGroup === 0) {
            const targetRect = event.currentTarget.getBoundingClientRect();
            const relativePosition = event.clientY - targetRect.top;
            setDropSide(
              relativePosition < targetRect.height / 2 ? "up" : "down",
            );
          }

          const dragData = props?.dragData;
          if (dragData?.type === "layer" || dragData?.type === "layer-group") {
            isDropCursorActive.setTrue();
          }
        }}
        onDragLeave={() => {
          const dragData = props?.dragData;
          if (dragData?.type === "layer" || dragData?.type === "layer-group") {
            isDropCursorActive.setFalse();
          }
        }}
        onDrop={(event) => {
          const dragData = getObjectDataTransfer<LayerDragData>(
            event.dataTransfer,
          );
          if (dragData?.type === "layer") {
            isDropCursorActive.setFalse();
            props.onDrop?.(dragData, dropSide === "down", event);
          }
          if (isFirstItem) {
            setDropSide("down");
          }
        }}
      >
        <Grid className={layerItemClassNames}>
          <Box className={classes.Icon}>
            {icon || getMdiIcon("helpCircleOutline", { size: 0.8 })}
          </Box>
          <Box className={classes.Label}>{label}</Box>
          {onAdd && (
            <Flex className={classes.OptionsContainer}>
              <Button
                wrapperClassName={"w-full h-full"}
                variant={"ghost"}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onAdd();
                }}
              >
                {getMdiIcon("plus", { size: 0.6 })}
              </Button>
            </Flex>
          )}
        </Grid>
        {isDropCursorActive.value && (
          <Box
            className={layerItemClassNames}
            style={{
              height: "3px",
              position: "absolute",
              background: "blue",
              bottom: !isFirstItem || dropSide === "down" ? 0 : undefined,
              top: isFirstItem && dropSide === "up" ? 0 : undefined,
              left: 0,
              right: 0,
            }}
          />
        )}
      </Flex>
    );
  },
);

Layer.displayName = "Layer";
