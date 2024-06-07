import { usePanel } from "@home-assistant-react/api/src";
import { getPanelDomObjectById } from "@home-assistant-react/helpers/src/panels/getPanelDomObjectById";
import React from "react";
import { useResizeObserver } from "./useResizeObserver";

export const useGetPanelDomSize = () => {
  const panel = usePanel();
  const panelId = panel?.panel?.id;
  const [panelDomSize, setPanelDomSize] = React.useState<DOMRect>();
  const [panelRef, setPanelRef] = React.useState<HTMLDivElement | null>(null);

  const handleResize = () => {
    if (!panelId) return;

    const ref = getPanelDomObjectById(panelId);
    if (!panelRef) setPanelRef(ref);
    const boundingRect = ref?.getBoundingClientRect();

    setPanelDomSize(boundingRect);
  };

  useResizeObserver(panelRef, () => {
    handleResize();
  });

  React.useEffect(() => {
    if (!panelId) return;

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [panelId]);

  return { panelRect: panelDomSize, refresh: handleResize };
};
