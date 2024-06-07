import React from "react";
import {
  TabsTrigger,
  Flex,
  Tabs,
  TabsContent,
  TabsList,
  cn,
} from "@home-assistant-react/ui/src";
import { createPortal } from "react-dom";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { useDashboardEditor } from "@home-assistant-react/api/src";
import { booleanDataAttr } from "@home-assistant-react/helpers/src";
import { AddPanelDrawerContext } from "./add-panel-drawer-context";
import { AddPanelSearchByEntities } from "./AddPanelSearchByEntities";
import { AddPanelSearchByPanels } from "./AddPanelSearchByPanels";

const classes = {
  Overlay: "bg-transparent fixed inset-0 z-overlay",
  Wrapper:
    "z-modal shadow-2xl fixed right-0 top-0 bottom-0 w-[40%] " +
    "bg-primary-background/50 backdrop-blur-xl",
  OpenAnimation: "animate-in duration-300 slide-in-from-right-40 fade-in",
  CloseAnimation: "animate-out duration-300 slide-out-to-right-40 fade-out",
  WrapperOnDragging: "transition-all translate-x-[100%]",
  Tabs: "w-full h-full flex flex-col",
  TabsList: "py-2 rounded-none border-b" + "bg-muted/60",
  TabContent: "h-full",
};

export const AddPanelDrawer = () => {
  const { panelsCreationDisclosure } = useDashboardEditor();
  const isDragging = useBooleanValue();
  const isOpen = useBooleanValue();

  const handleEndDragging = (forceClose?: boolean) => {
    if (forceClose) {
      isOpen.setFalse();
      panelsCreationDisclosure.close();
    }

    isDragging.setFalse();
  };

  React.useEffect(() => {
    if (panelsCreationDisclosure.isOpen) {
      return isOpen.setTrue();
    }

    if (isDragging.value) {
      return isOpen.setFalse();
    }

    const timeout = setTimeout(() => {
      isOpen.setFalse();
    }, 150);

    return () => clearTimeout(timeout);
  }, [panelsCreationDisclosure.isOpen]);

  if (!isOpen.value) return null;

  return createPortal(
    <Flex>
      {!isDragging.value && (
        <Flex
          className={classes.Overlay}
          onClick={panelsCreationDisclosure.close.bind(null, undefined)}
        />
      )}
      <Flex
        data-open={booleanDataAttr(panelsCreationDisclosure.isOpen)}
        data-dragging={booleanDataAttr(isDragging.value)}
        className={cn(
          classes.Wrapper,
          panelsCreationDisclosure.isOpen
            ? classes.OpenAnimation
            : classes.CloseAnimation,
          isDragging.value && classes.WrapperOnDragging,
        )}
      >
        <AddPanelDrawerContext
          value={{
            allowDrag: !!panelsCreationDisclosure.data?.allowDrag,
            isDragging: isDragging.value,
            startDragging: isDragging.setTrue,
            endDragging: handleEndDragging,
            openEditorWhenAdded:
              panelsCreationDisclosure.data?.openEditorWhenAdded,
          }}
        >
          <Tabs defaultValue={"entities"} className={classes.Tabs}>
            <TabsList className={cn(classes.TabsList)}>
              <TabsTrigger value="panels">Panels</TabsTrigger>
              <TabsTrigger value="entities">Entities</TabsTrigger>
            </TabsList>
            <TabsContent value={"panels"} className={classes.TabContent}>
              <AddPanelSearchByPanels />
            </TabsContent>
            <TabsContent value={"entities"} className={classes.TabContent}>
              <AddPanelSearchByEntities />
            </TabsContent>
          </Tabs>
        </AddPanelDrawerContext>
      </Flex>
    </Flex>,
    window.document.body,
  );
};
