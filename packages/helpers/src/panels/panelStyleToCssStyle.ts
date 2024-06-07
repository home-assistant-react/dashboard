import {
  BackgroundImageType,
  CSSPropertiesWithCustomVars,
  CUSTOM_BORDER_COLOR_CSS_VAR,
  CUSTOM_BORDER_WIDTH_CSS_VAR,
  PanelFcStyleProperties,
} from "@home-assistant-react/types/src";
import React from "react";
import { getShadowFromDashboardStyle } from "../css/getShadowFromDashboardStyle";

export interface PanelStyleToCssStyleOptions {
  customImagesUrlGetter?: (imageId: string) => string;
  useCustomVariables?: boolean;
}

/**
 * Converts panel style properties to a CSS style object.
 * This function takes a set of panel-specific style properties and an optional configuration object for handling custom image URLs.
 * It generates a CSS style object that can be applied to React components.
 *
 * @param panelStyle - An object containing panel-specific style properties.
 * @param options - An optional object with a function to retrieve custom image URLs.
 * @returns A CSSProperties object containing the converted style properties.
 *
 * @example
 * // Example usage:
 * const panelStyle = {
 *   backgroundColor: "#fff",
 *   borderColor: "#000",
 *   borderWidth: 2,
 *   fontSize: 14,
 *   borderRadius: 5,
 *   backgroundImageType: BackgroundImageType.Url,
 *   backgroundImageValue: "https://example.com/image.png",
 * };
 * const cssStyle = panelStyleToCssStyle(panelStyle);
 * console.log(cssStyle);
 * // Outputs a CSSProperties object with corresponding styles.
 */
export function panelStyleToCssStyle(
  panelStyle?: PanelFcStyleProperties,
  options?: PanelStyleToCssStyleOptions,
) {
  const cssStyle: CSSPropertiesWithCustomVars = {};

  if (!panelStyle) return cssStyle;

  const useCustomVariables = options?.useCustomVariables !== false;

  const {
    backgroundColor,
    backgroundGradient,
    backgroundImageValue,
    customBackgroundImage,
    backgroundImageType,
    borderColor,
    borderWidth,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,

    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,

    fontSize,
    ...rest
  } = panelStyle;

  const backgroundImages: string[] = [];
  if (backgroundColor) {
    cssStyle.backgroundColor = backgroundColor;
  }

  if (backgroundImageType === BackgroundImageType.Url && backgroundImageValue) {
    backgroundImages.push(`url("${encodeURI(backgroundImageValue)}")`);
  }

  if (
    backgroundImageType === BackgroundImageType.Custom &&
    customBackgroundImage &&
    options?.customImagesUrlGetter
  ) {
    backgroundImages.push(
      `url("${encodeURI(options.customImagesUrlGetter(customBackgroundImage.image))}")`,
    );
  }

  if (backgroundGradient) {
    backgroundImages.push(backgroundGradient);
  }

  if (backgroundImages.length > 0) {
    cssStyle.backgroundImage = backgroundImages.join(", ");
  }

  if (cssStyle.backgroundColor && !cssStyle.backgroundImage) {
    cssStyle.backgroundImage = "none";
  }

  if (borderColor !== undefined) {
    cssStyle[useCustomVariables ? CUSTOM_BORDER_COLOR_CSS_VAR : "borderColor"] =
      borderColor;
  }

  if (borderWidth !== undefined) {
    cssStyle[useCustomVariables ? CUSTOM_BORDER_WIDTH_CSS_VAR : "borderWidth"] =
      String(borderWidth) + "px";
  }

  if (fontSize !== undefined) {
    cssStyle["fontSize"] = String(fontSize) + "px";
  }

  if (borderRadius !== undefined) {
    cssStyle["borderRadius"] = String(borderRadius) + "px";
  }

  if (borderTopLeftRadius !== undefined) {
    cssStyle["borderTopLeftRadius"] = String(borderTopLeftRadius) + "px";
  }

  if (borderTopRightRadius !== undefined) {
    cssStyle["borderTopRightRadius"] = String(borderTopRightRadius) + "px";
  }

  if (borderBottomLeftRadius !== undefined) {
    cssStyle["borderBottomLeftRadius"] = String(borderBottomLeftRadius) + "px";
  }

  if (borderBottomRightRadius !== undefined) {
    cssStyle["borderBottomRightRadius"] =
      String(borderBottomRightRadius) + "px";
  }

  if (paddingLeft !== undefined) {
    cssStyle["paddingLeft"] = String(paddingLeft) + "px";
  }

  if (paddingRight !== undefined) {
    cssStyle["paddingRight"] = String(paddingRight) + "px";
  }

  if (paddingTop !== undefined) {
    cssStyle["paddingTop"] = String(paddingTop) + "px";
  }

  if (paddingBottom !== undefined) {
    cssStyle["paddingBottom"] = String(paddingBottom) + "px";
  }

  if (panelStyle.noShadow === true) {
    cssStyle.boxShadow = "none";
  } else if (panelStyle.shadowColor) {
    cssStyle.boxShadow = getShadowFromDashboardStyle(panelStyle);
  }

  return { ...cssStyle, ...rest } as React.CSSProperties;
}
