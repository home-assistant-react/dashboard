import { useDashboardEditor } from "@home-assistant-react/api/src";
import { dashboardHotkeys } from "@home-assistant-react/defines/src/hotkeys/dashboard-hotkeys";
import React from "react";
import { ContextMenuItem, ContextMenuShortcut } from "../../../components";

export const ArrangePanelsContextItems: React.FC = () => {
  const { isArranging } = useDashboardEditor();

  const handleArrangePanels = () => {
    isArranging.setTrue();
  };

  const handleExitArrangeMode = () => {
    isArranging.setFalse();
  };

  return (
    <>
      {!isArranging.value && (
        <ContextMenuItem
          disabled={isArranging.value}
          mdiIcon={"moveResize"}
          onClick={handleArrangePanels}
        >
          Arrange panels
          <ContextMenuShortcut
            sequence={dashboardHotkeys.TOGGLE_ARRANGE_MODE}
          />
        </ContextMenuItem>
      )}
      {isArranging.value && (
        <>
          <ContextMenuItem
            mdiIcon={"closeCircleOutline"}
            onClick={handleExitArrangeMode}
          >
            Exit arrange mode
          </ContextMenuItem>
        </>
      )}
    </>
  );
};
