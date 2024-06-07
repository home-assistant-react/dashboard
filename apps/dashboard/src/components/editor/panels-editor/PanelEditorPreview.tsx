import { getPanelDomObjectById } from "@home-assistant-react/helpers/src/panels/getPanelDomObjectById";
import React from "react";
import { usePanelEditor } from "@home-assistant-react/api/src";
import { Panel } from "@home-assistant-react/ui/src";

export const PanelEditorPreview = React.forwardRef<HTMLDivElement>(() => {
  const { panel } = usePanelEditor();
  const [boundingRect, setBoundingRect] = React.useState<DOMRect>();

  const updateBoundingRect = React.useCallback(() => {
    if (!panel) return;
    const boundingRect = getPanelDomObjectById(
      panel.id,
    )?.getBoundingClientRect();
    setBoundingRect(boundingRect);
  }, [panel?.id]);

  React.useEffect(() => {
    updateBoundingRect();

    const onResize = () => {
      updateBoundingRect();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [updateBoundingRect]);

  if (!panel) return null;

  return (
    <Panel
      key={panel.id}
      group={{} as never}
      panel={panel}
      style={{
        width: `${boundingRect?.width || 100}px`,
        height: `${boundingRect?.height || 100}px`,
        padding: 0,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );
});

PanelEditorPreview.displayName = "PanelEditorPreview";
