import { useDashboardEditor } from "@home-assistant-react/api/src";
import React from "react";
import { ContextMenuItem } from "../../../components";

export const CreateNewPanelWithGroupContextItems: React.FC = () => {
  const { isArranging, panelsCreationDisclosure } = useDashboardEditor();

  const handleAddPanel = () => {
    panelsCreationDisclosure.open({
      allowDrag: true,
    });
    isArranging.setFalse();
  };

  return (
    <>
      <ContextMenuItem mdiIcon={"plus"} onClick={handleAddPanel}>
        Add new group with panel
      </ContextMenuItem>
    </>
  );
};
