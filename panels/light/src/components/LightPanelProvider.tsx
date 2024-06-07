import { useHassGetEntity } from "@home-assistant-react/api/src";
import { useLightServices } from "@home-assistant-react/api/src/services/light";
import { lightSupportsBrightness } from "@home-assistant-react/helpers/src/home-assistant/entities/light";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import { HassLightEntityAttributes } from "@home-assistant-react/types/src";
import React from "react";
import { LightPanel } from "../index";
import { LightOptions, LightPanelState } from "../defines/types";

export const LightPanelContext = React.createContext<
  LightPanelState | undefined
>(undefined);

export interface LightPanelProviderProps extends React.PropsWithChildren {
  options?: LightOptions;
}

export const LightPanelProvider: React.FC<LightPanelProviderProps> = ({
  children,
  options,
}) => {
  const entityId = options?.entity_id || "";
  const lightEntity = useHassGetEntity<HassLightEntityAttributes>(entityId);
  const light = useLightServices(lightEntity);
  const moreModalDisclosure = useDisclosure();

  const hasBrightnessControl = lightEntity
    ? lightSupportsBrightness(lightEntity)
    : false;

  const brightness =
    (hasBrightnessControl && lightEntity?.attributes.brightness) || 0;

  const isLightOn = lightEntity?.state === "on";

  const hasSliderOnPanel =
    options?.sliderOnPanel ?? LightPanel.defaultOptions!.sliderOnPanel ?? false;

  if (!lightEntity) return <></>;

  return (
    <LightPanelContext.Provider
      value={{
        options,
        lightEntity,
        isLightOn,
        hasBrightnessControl,
        hasSliderOnPanel,
        brightness,
        light,
        moreModalDisclosure,
      }}
    >
      {children}
    </LightPanelContext.Provider>
  );
};

export const useLightPanel = () => {
  const context = React.useContext(LightPanelContext);
  if (context === undefined) {
    throw new Error("useLightPanel must be used within a LightPanelProvider");
  }
  return context;
};
