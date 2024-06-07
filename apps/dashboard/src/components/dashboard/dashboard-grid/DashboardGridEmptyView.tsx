import { useDashboardEditor } from "@home-assistant-react/api/src";
import { Button, Flex } from "@home-assistant-react/ui/src";
import { Heading } from "@home-assistant-react/ui/src/components/data-display/Heading";
import React from "react";

export const DashboardGridEmptyView: React.FC = () => {
  const { panelsCreationDisclosure, isArranging } = useDashboardEditor();
  const handleAddPanelToGroup = () => {
    panelsCreationDisclosure.open({
      allowDrag: false,
      onAdded: () => {},
    });
    isArranging.setFalse();
  };
  return (
    <Flex
      className={"absolute inset-0 items-center justify-center flex-col gap-6"}
    >
      <Heading as={"h4"}>🚀 Add your first panel on this view!</Heading>
      <Flex>
        <Button size={"xl"} icon={"Plus"} onClick={handleAddPanelToGroup}>
          Add panel
        </Button>
      </Flex>
    </Flex>
  );
};
