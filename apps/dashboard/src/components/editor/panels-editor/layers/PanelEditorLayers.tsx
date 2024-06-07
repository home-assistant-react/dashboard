import { AnimationContainer } from "@home-assistant-react/ui/src/primitives/AnimationContainer";
import React from "react";
import {
  useDashboard,
  useDashboardEditor,
} from "@home-assistant-react/api/src";
import { Scrollbars } from "react-custom-scrollbars";
import { PanelEditingData } from "@home-assistant-react/types/src/editor/panel-editing-data";
import { Button, DebouncedInput, Flex } from "@home-assistant-react/ui/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { getPanelLayerItems } from "./helpers";
import { PanelEditorLayerItem } from "./PanelEditorLayerItem";
import { PanelEditorLayerGroupItem } from "./PanelEditorLayerGroupItem";
import {
  LayerDragData,
  LayerGroupDragData,
} from "@home-assistant-react/types/src";

const classes = {
  Wrapper: "w-full gap-2 flex-col",
  SearchContainer:
    "p-2 gap-2 bg-primary-background rounded-lg items-center justify-center",
  LayersContainer: "h-full bg-primary-background rounded-lg overflow-hidden",
};

export const PanelEditorLayers = React.forwardRef<HTMLDivElement>((_, ref) => {
  const dashboard = useDashboard();
  const dashboardEditor = useDashboardEditor();
  const [searchValue, setSearchValue] = React.useState("");
  const [dragData, setDragData] = React.useState<
    LayerDragData | LayerGroupDragData | undefined
  >(undefined);
  const { startPanelEditing } = dashboardEditor;

  const [scrollAreaRef, setScrollAreaRef] = React.useState<Scrollbars | null>();
  const uiState = React.useRef<{ preventItemScroll: boolean }>({
    preventItemScroll: false,
  });

  const groupId = "";
  const panelId = dashboardEditor.panelsEditorDisclosure.data?.panelId;

  const handleSetEditingData = (data?: PanelEditingData) => {
    uiState.current.preventItemScroll = true;
    startPanelEditing({
      ...data,
      viewId: dashboardEditor.panelsEditorDisclosure.data?.viewId,
      sidebarId: dashboardEditor.panelsEditorDisclosure.data?.sidebarId,
    });
  };

  React.useEffect(() => {
    if (uiState.current.preventItemScroll) {
      uiState.current.preventItemScroll = false;
      return;
    }
    if (!scrollAreaRef) return;
    if (!groupId && !panelId) return;
    const element = (window.document.querySelector(
      `.layer-item-panel-${panelId}`,
    ) ||
      window.document.querySelector(
        `.layer-item-group-${groupId}`,
      )) as HTMLElement;

    // check if element is visible in the scroll area
    if (element) {
      const visibleArea =
        scrollAreaRef.getScrollTop() + scrollAreaRef.getClientHeight();
      if (element.offsetTop + element.offsetHeight > visibleArea) {
        scrollAreaRef.scrollTop(element.offsetTop - element.offsetHeight);
      }
    }
  }, [panelId, groupId, scrollAreaRef]);

  const groups = dashboardEditor.panelsEditorDisclosure.data?.sidebarId
    ? dashboard?.sidebars?.find(
        (s) => s.id === dashboardEditor.panelsEditorDisclosure.data?.sidebarId,
      )?.groups
    : dashboard?.views?.find(
        (view) =>
          view.id === dashboardEditor.panelsEditorDisclosure.data?.viewId,
      )?.layout || [];

  return (
    <Flex ref={ref} className={classes.Wrapper}>
      <Flex className={classes.SearchContainer}>
        <DebouncedInput
          onChangeValue={(value) => setSearchValue(value)}
          placeholder={"Search in panels"}
          value={searchValue}
          hideEmptyMessages
          delay={0}
          isClearable
        />
        <Button
          variant={"outline"}
          onClick={() =>
            dashboardEditor.startAdding({
              targetId: "",
              openEditorWhenAdded: true,
            })
          }
        >
          {getMdiIcon("plus", { size: 0.8 })}
        </Button>
      </Flex>
      <Flex className={classes.LayersContainer}>
        <Scrollbars style={{ height: "100%" }} ref={setScrollAreaRef}>
          <AnimationContainer>
            {groups?.map((layout) => {
              const layers = getPanelLayerItems(dashboard, layout, layout.i);
              return (
                <React.Fragment key={layout.i}>
                  <PanelEditorLayerGroupItem
                    searchValue={searchValue}
                    updateEditingData={handleSetEditingData}
                    layout={layout}
                    dragData={dragData}
                    setDragData={setDragData}
                  />
                  <AnimationContainer>
                    {layers?.length > 0 &&
                      layers.map((layer, positionInGroup) => {
                        return (
                          <PanelEditorLayerItem
                            searchValue={searchValue}
                            layer={{ ...layer, panel: { ...layer.panel } }}
                            updateEditingData={handleSetEditingData}
                            key={`${layer.panel.id}`}
                            dragData={dragData}
                            setDragData={setDragData}
                            positionInGroup={positionInGroup}
                          />
                        );
                      })}
                  </AnimationContainer>
                </React.Fragment>
              );
            })}
          </AnimationContainer>
        </Scrollbars>
      </Flex>
    </Flex>
  );
});

PanelEditorLayers.displayName = "PanelEditorLayers";
