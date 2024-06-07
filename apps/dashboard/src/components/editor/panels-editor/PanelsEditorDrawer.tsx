import React from "react";
import {
  useDashboard,
  useDashboardEditor,
} from "@home-assistant-react/api/src";
import { createPortal } from "react-dom";
import { PanelEditorProvider } from "@home-assistant-react/providers/src";
import { Flex } from "@home-assistant-react/ui/src";
import {
  Panel,
  PanelEditorState,
  PanelsGroup,
  PanelsGroupOptions,
} from "@home-assistant-react/types/src";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src/panels/getPanelFromDashboardState";
import { PanelEditorPreview } from "./PanelEditorPreview";
import { PanelEditor } from "./PanelEditor";
import { PanelEditorLayers } from "./layers/PanelEditorLayers";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { PanelEditorEmptySelect } from "./PanelEditorEmptySelect";
import { useBooleanValue } from "@home-assistant-react/hooks/src";

const classes = {
  Wrapper: "z-modal fixed inset-0",
  Overlay: "bg-black/70 backdrop-blur-md fixed inset-0",
  OverlayCloseAnimation: "animate-out fade-out duration-300",
  OverlayOpenAnimation: "animate-in fade-in duration-300",
  Preview: "z-modal w-1/2 h-full p-10 justify-center",
  PreviewCloseAnimation:
    "animate-out fade-out slide-out-to-top-20 duration-300",
  PreviewOpenAnimation: "animate-in fade-in slide-in-from-top-20 duration-300",
  Editor: "z-modal gap-2 rounded-xl w-1/2 p-2 fixed bottom-0 top-0 right-0",
  EditorSide:
    "bg-primary-background shadow-xl rounded-xl overflow-hidden flex-grow",
  EditorSideCloseAnimation:
    "animate-out slide-out-to-bottom-20 fade-out duration-300 zoom-out-90",
  EditorSideOpenAnimation:
    "animate-in slide-in-from-bottom-20 fade-in duration-300 zoom-in-90",
  LayerSide: "w-[288px] min-w-[288px]",
  LayerSideCloseAnimation:
    "animate-out slide-out-to-right fade-out duration-300 zoom-out-90",
  LayerSideOpenAnimation:
    "animate-in slide-in-from-right fade-in duration-300 zoom-in-90",
};

export const PanelsEditorDrawer = React.forwardRef<HTMLDivElement>((_, ref) => {
  const dashboardEditor = useDashboardEditor();
  const dashboard = useDashboard();
  const [panel, setPanel] = React.useState<Panel>();
  const [groupOptions, setGroupOptions] = React.useState<PanelsGroupOptions>(
    {},
  );
  const [selectedGroup, setSelectedGroup] = React.useState<
    PanelsGroup | undefined
  >();
  const [originalPanel, setOriginalPanel] = React.useState<Panel>();
  const isOpen = useBooleanValue();
  const isDisclosed = dashboardEditor.panelsEditorDisclosure.isOpen;

  const depPanelStyles = sanitizeDep(panel?.styles);
  const depPanelOptions = sanitizeDep(panel?.options);

  const hasChanges = React.useMemo(() => {
    if (!panel || !originalPanel) return false;
    return (
      depPanelOptions !== JSON.stringify(originalPanel.options) ||
      depPanelStyles !== JSON.stringify(originalPanel.styles)
    );
  }, [
    depPanelStyles,
    depPanelOptions,
    originalPanel?.styles,
    originalPanel?.options,
  ]);

  const panelId = dashboardEditor.panelsEditorDisclosure.data?.panelId;
  const sidebarId = dashboardEditor.panelsEditorDisclosure.data?.sidebarId;

  React.useEffect(() => {
    //if (panelId && panel?.id === panelId) return;
    if (!panelId || !dashboard) {
      setPanel(undefined);
      setSelectedGroup(undefined);
      setGroupOptions({});
      return;
    }

    const group = (() => {
      const layout = sidebarId
        ? dashboard.sidebars?.find((s) => s.id === sidebarId)?.groups
        : dashboard.views?.find(
            (view) => view.id === dashboard.selectedDashboardView,
          )?.layout;

      return (layout || []).find((group) => {
        return group.panels?.find((panel) => {
          if (panel === panelId) {
            return true;
          }

          const subPanels = dashboard.panels?.[panel]?.options?.panels;
          if (Array.isArray(subPanels)) {
            return subPanels.includes(panelId);
          }

          return false;
        });
      });
    })();

    const _panel = getPanelFromDashboardState(dashboard, panelId);
    setPanel(JSON.parse(JSON.stringify(_panel || {})));
    setOriginalPanel(JSON.parse(JSON.stringify(_panel || {})));
    setGroupOptions(group?.groupOptions || {});
    setSelectedGroup(group);
  }, [panelId, isDisclosed]);

  React.useEffect(() => {
    if (isDisclosed) {
      isOpen.setTrue();

      return;
    }

    const timeout = setTimeout(() => {
      isOpen.setFalse();
    }, 100);

    return () => clearTimeout(timeout);
  }, [isDisclosed]);

  if (!isOpen.value) {
    return null;
  }

  const updateOptions: PanelEditorState["updateOptions"] = (
    optionKey: string,
    value: unknown,
  ) => {
    setPanel((panel) =>
      panel
        ? { ...panel, options: { ...panel.options, [optionKey]: value } }
        : undefined,
    );
  };
  const updateGroupOption: PanelEditorState["updateGroupOption"] = (
    optionKey: string,
    value: unknown,
  ) => {
    setGroupOptions((groupOptions) => ({
      ...groupOptions,
      [optionKey]: value,
    }));
  };

  const updateStyle: PanelEditorState["updateStyle"] = (
    styleKey,
    styleProp,
    styleValue,
  ) => {
    setPanel((_panel) => {
      if (!_panel) return undefined;
      const panel = { ..._panel };
      if (!panel?.styles) panel.styles = {};
      if (!panel?.styles?.[styleKey]) panel.styles[styleKey] = {};
      if (
        styleValue === undefined ||
        styleValue === null ||
        styleValue === ""
      ) {
        delete panel.styles[styleKey][styleProp];
        return panel;
      }

      panel.styles[styleKey][styleProp] = styleValue;
      return panel;
    });
  };

  const deletePanel: PanelEditorState["deletePanel"] = () => {
    if (panel) {
      dashboardEditor.deletePanel(panel, {
        onConfirm: () => {
          dashboardEditor.panelsEditorDisclosure.open(undefined);
        },
      });
    }
  };

  const movePanelToGroup: PanelEditorState["movePanelToGroup"] = async (
    panelId,
    groupId,
    beforePanelId,
  ) => {
    return await dashboard.movePanelToGroup(panelId, groupId, beforePanelId);
  };

  const isClosing = !isDisclosed && isOpen.value;

  return createPortal(
    <PanelEditorProvider
      value={{
        sidebarId: dashboardEditor?.panelsEditorDisclosure?.data?.sidebarId,
        panel,
        updateOptions,
        updateStyle,
        hasChanges,
        deletePanel,
        updateGroupOption,
        groupOptions,
        group: selectedGroup,
        movePanelToGroup,
      }}
    >
      <Flex
        data-closing={isClosing ? "true" : undefined}
        ref={ref}
        className={classes.Wrapper}
        onClick={dashboardEditor.panelsEditorDisclosure.close.bind(
          null,
          undefined,
        )}
      >
        <Flex
          className={[
            classes.Overlay,
            !isClosing
              ? classes.OverlayOpenAnimation
              : classes.OverlayCloseAnimation,
          ]}
        />
        <Flex
          className={[
            classes.Preview,
            !isClosing
              ? classes.PreviewOpenAnimation
              : classes.PreviewCloseAnimation,
          ]}
        >
          <PanelEditorPreview />
        </Flex>
        <Flex className={[classes.Editor]} onClick={(e) => e.stopPropagation()}>
          <Flex
            className={[
              classes.EditorSide,
              !isClosing
                ? classes.EditorSideOpenAnimation
                : classes.EditorSideCloseAnimation,
            ]}
          >
            {panel ? (
              <PanelEditor key={`editor-${panelId}`} />
            ) : (
              <PanelEditorEmptySelect />
            )}
          </Flex>
          <Flex
            className={[
              classes.LayerSide,
              !isClosing
                ? classes.LayerSideOpenAnimation
                : classes.LayerSideCloseAnimation,
            ]}
          >
            <PanelEditorLayers />
          </Flex>
        </Flex>
      </Flex>
    </PanelEditorProvider>,
    document.body,
  );
});

PanelsEditorDrawer.displayName = "PanelsEditorDrawer";
