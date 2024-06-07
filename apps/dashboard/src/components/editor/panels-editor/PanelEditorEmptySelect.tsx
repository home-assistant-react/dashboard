import React from "react";
import { Flex, Box, Button } from "@home-assistant-react/ui/src";

const classes = {
  Wrapper: "w-full h-full items-center justify-center gap-4 flex-col",
};

export const PanelEditorEmptySelect = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    return (
      <Flex className={classes.Wrapper} ref={ref}>
        <Box>No panel selected</Box>
        <Box>Select a panel or create a new one</Box>
        <Button>Add panel</Button>
      </Flex>
    );
  },
);

PanelEditorEmptySelect.displayName = "PanelEditorEmptySelect";
