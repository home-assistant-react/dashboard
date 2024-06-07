import { useBooleanValue } from "@home-assistant-react/hooks/src";
import React from "react";
import { Collapsible } from "../../../components/data-display/Collapsible";
import { cn } from "../../../helpers";
import { Icon } from "../../../primitives/Icon";
import { EditorCategoryWrapperProps } from "./EditorCategoryWrapper.types";
import { Box, Flex } from "../../../primitives/common";

const classes = {
  Title:
    "w-full py-3 px-8 border-b border-t bg-secondary/50 text-secondary-foreground text-sm font-semibold select-none justify-between",
  TitleCollapsible:
    "transition-colors cursor-pointer bg-muted hover:bg-muted/50",
  Content: "py-4 px-8",
  Chevron: "text-muted-foreground transform transition-transform",
  ChevronExpanded: "rotate-180",
};

export const EditorCategoryWrapper = React.forwardRef<
  HTMLDivElement,
  EditorCategoryWrapperProps
>((props, ref) => {
  const {
    title,
    children,
    isCollapsible = true,
    initialIsExpanded = true,
    ...rest
  } = props;
  const isExpanded = useBooleanValue(initialIsExpanded ?? false);

  const content = <Box className={classes.Content}>{children}</Box>;

  const handleTitleClick = () => {
    if (!isCollapsible) return;
    isExpanded.toggle();
  };

  return (
    <Box ref={ref} {...rest}>
      <Flex
        className={[classes.Title, isCollapsible && classes.TitleCollapsible]}
        onClick={handleTitleClick}
      >
        {title}
        <Icon
          name={"ChevronDown"}
          className={cn(
            classes.Chevron,
            isExpanded.value && classes.ChevronExpanded,
          )}
        />
      </Flex>
      {isCollapsible ? (
        <Collapsible isOpen={isExpanded.value}>{content}</Collapsible>
      ) : (
        content
      )}
    </Box>
  );
});

EditorCategoryWrapper.displayName = "EditorCategoryWrapper";
