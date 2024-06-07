import {
  LightColorMode,
  LightState,
  SupportedColorMode,
} from "@home-assistant-react/types/src";

const modesSupportingColor = [
  LightColorMode.HS,
  LightColorMode.XY,
  LightColorMode.RGB,
  LightColorMode.RGBW,
  LightColorMode.RGBWW,
];

const modesSupportingBrightness = [
  ...modesSupportingColor,
  LightColorMode.COLOR_TEMP,
  LightColorMode.BRIGHTNESS,
  LightColorMode.WHITE,
];

export const colorModesHasBrightness = (modes?: SupportedColorMode[]) => {
  if (!modes) return false;

  return modes.some(
    (mode) =>
      mode === SupportedColorMode.Brightness ||
      mode === SupportedColorMode.XY ||
      mode === SupportedColorMode.ColorTemp,
  );
};

export const colorModesHasRgb = (modes?: SupportedColorMode[]) => {
  if (!modes) return false;

  return modes.some((mode) => mode === SupportedColorMode.XY);
};

export const lightSupportsColorMode = (
  entity: LightState,
  mode: LightColorMode,
) => entity.attributes.supported_color_modes?.includes(mode) || false;

export const getLightCurrentModeRgbColor = (
  entity: LightState,
): number[] | undefined =>
  entity.attributes.color_mode === LightColorMode.RGBWW
    ? entity.attributes.rgbww_color
    : entity.attributes.color_mode === LightColorMode.RGBW
    ? entity.attributes.rgbw_color
    : entity.attributes.rgb_color;

export const lightSupportsColor = (entity: LightState) =>
  entity.attributes.supported_color_modes?.some((mode) =>
    modesSupportingColor.includes(mode),
  ) || false;

export const lightSupportsBrightness = (entity: LightState) =>
  entity.attributes.supported_color_modes?.some((mode) =>
    modesSupportingBrightness.includes(mode),
  ) || false;

export const lightSupportsFavoriteColors = (entity: LightState) =>
  lightSupportsColor(entity) ||
  lightSupportsColorMode(entity, LightColorMode.COLOR_TEMP);
