import { useLongPress } from "@home-assistant-react/hooks/src";
import { usePanelLoadingEffect } from "@home-assistant-react/hooks/src/usePanelLoadingEffect";
import { Flex } from "@home-assistant-react/ui/src";
import React from "react";
import { useLightPanelActive } from "../../helpers";
import { LightPanel } from "../../index";
import { LightOptionsModal } from "../more-modal/LightOptionsModal";
import { LightPanelGrid } from "./LightPanelGrid";
import { LightOnCardSlider } from "./LightOnCardSlider";
import { useLightPanel } from "../LightPanelProvider";

const classes = {
  Wrapper: "relative h-full w-full",
};

export const LightInner: React.FC = () => {
  useLightPanelActive();

  const { light, isLightOn, options, moreModalDisclosure } = useLightPanel();

  const { requestLoading } = usePanelLoadingEffect([isLightOn], {
    delay: 300,
  });

  const [rightSideRef, setLeftSideRef] =
    React.useState<HTMLDivElement | null>();

  const longPressHandler = useLongPress(moreModalDisclosure.open, async () => {
    requestLoading();
    await light[isLightOn ? "turnOff" : "turnOn"]();
  });

  const sliderControlWidth = rightSideRef?.offsetLeft
    ? rightSideRef?.offsetLeft - 10
    : 180;

  return (
    <Flex className={classes.Wrapper}>
      <LightPanelGrid
        rightSideRef={setLeftSideRef}
        {...longPressHandler}
        showToggle={
          options?.showToggle ?? LightPanel.defaultOptions!.showToggle
        }
        showStatus={
          options?.showStatus ?? LightPanel.defaultOptions!.showStatus
        }
      />
      <LightOnCardSlider sliderControlWidth={sliderControlWidth} />
      <LightOptionsModal />
    </Flex>
  );
};
