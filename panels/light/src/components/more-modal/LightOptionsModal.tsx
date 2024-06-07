import { Modal } from "@home-assistant-react/ui/src/components/modals/Modal/Modal";
import React from "react";
import {
  LightColorMode,
  LightEntityFeature,
} from "@home-assistant-react/types/src";
import {
  Box,
  Flex,
  ToggleGroupItem,
  ToggleGroup,
  Button,
  LightBrightnessSlider,
  LightColorTemperatureSlider,
} from "@home-assistant-react/ui/src";
import { useComputeStateDisplay } from "@home-assistant-react/api/src/hooks";
import { useLightServices } from "@home-assistant-react/api/src/services/light";
import {
  brightnessToPercent,
  supportsFeature,
} from "@home-assistant-react/helpers/src/home-assistant";
import { formatPercentage } from "@home-assistant-react/helpers/src/locale/formatPercentage";
import {
  lightSupportsBrightness,
  lightSupportsColor,
  lightSupportsColorMode,
} from "@home-assistant-react/helpers/src/home-assistant/entities/light";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { LightColorSelect } from "@home-assistant-react/ui/src/entity-controls/LightColorSelect";
import { LightEffectSelect } from "@home-assistant-react/ui/src/entity-controls/LightEffectSelect";
import { useLightPanel } from "../LightPanelProvider";

const classes = {
  Wrapper: "gap-4 flex-col items-center justify-center w-full",
  InfoContainer: "text-center text-4xl font-light",
  ControlsContainer: "gap-8",
  RgbControlsContainer: "items-center justify-center flex-col",
};

export const LightOptionsModal = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const { lightEntity, moreModalDisclosure } = useLightPanel();
    const entityDisplayState = useComputeStateDisplay(lightEntity);
    const light = useLightServices(lightEntity);
    const [selectedControl, setSelectedControl] = React.useState("brightness");

    const hasBrightnessControl = lightSupportsBrightness(lightEntity);
    const hasRgbControl = lightSupportsColor(lightEntity);

    const supportsEffects = supportsFeature(
      lightEntity,
      LightEntityFeature.EFFECT,
    );
    const supportsColorTemp = lightSupportsColorMode(
      lightEntity,
      LightColorMode.COLOR_TEMP,
    );

    const isLightOn = lightEntity?.state === "on";

    return (
      <Modal
        title={lightEntity.attributes.friendly_name}
        isOpen={moreModalDisclosure.isOpen}
        onOpenChange={moreModalDisclosure.onOpenChange}
        ref={ref}
      >
        <Flex className={classes.Wrapper}>
          <Box className={classes.InfoContainer}>
            {entityDisplayState}{" "}
            {lightEntity?.attributes.brightness
              ? formatPercentage(
                  brightnessToPercent(lightEntity?.attributes.brightness),
                )
              : null}
          </Box>
          <Flex className={classes.ControlsContainer}>
            {hasBrightnessControl && selectedControl === "brightness" && (
              <LightBrightnessSlider entity={lightEntity} />
            )}
            {hasRgbControl && selectedControl === "color" && (
              <Flex className={classes.RgbControlsContainer}>
                <LightColorSelect entity={lightEntity} />
              </Flex>
            )}{" "}
            {supportsColorTemp && selectedControl === "temperature" && (
              <LightColorTemperatureSlider
                entity={lightEntity}
                isHandleFloating
              />
            )}
          </Flex>
          <Flex
            style={{
              gap: 24,
            }}
          >
            {supportsEffects && <LightEffectSelect entity={lightEntity} />}
            <ToggleGroup
              type={"single"}
              style={{ height: "50px" }}
              onValueChange={setSelectedControl}
              value={selectedControl}
            >
              <ToggleGroupItem value={"brightness"}>
                {getMdiIcon("brightness6")}
              </ToggleGroupItem>
              <ToggleGroupItem value={"color"}>
                {getMdiIcon("palette")}
              </ToggleGroupItem>
              <ToggleGroupItem value={"temperature"}>
                {getMdiIcon("sunSnowflakeVariant")}
              </ToggleGroupItem>
            </ToggleGroup>
          </Flex>
          <Button
            onClick={() => {
              isLightOn ? light.turnOff() : light.turnOn();
            }}
            size={"lg"}
            variant={"secondary"}
            style={{ height: "100%", color: isLightOn ? "green" : "red" }}
          >
            {getMdiIcon("power")}
          </Button>
        </Flex>
      </Modal>
    );
  },
);

LightOptionsModal.displayName = "LightOptionsModal";
