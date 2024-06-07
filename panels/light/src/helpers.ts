import { usePanel } from "@home-assistant-react/api/src";
import React from "react";
import { useLightPanel } from "./components/LightPanelProvider";

export const useLightPanelActive = () => {
  const panel = usePanel();
  const { isLightOn } = useLightPanel();
  React.useEffect(() => {
    panel.isActive?.setValue(isLightOn);
  }, [isLightOn]);
};
