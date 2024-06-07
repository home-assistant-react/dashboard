import { useHass } from "@home-assistant-react/api/src";
import { useGetCustomImageUrl } from "@home-assistant-react/hooks/src/useGetCustomImageUrl";
import { PanelFcStyleProperties } from "@home-assistant-react/types/src";
import {
  panelStyleToCssStyle,
  PanelStyleToCssStyleOptions,
} from "./panelStyleToCssStyle";

/**
 * Hook to convert panel style properties to a CSS style object with support for custom image URLs.
 *
 * @returns A function that takes panel style properties and returns a CSSProperties object.
 *
 * @example
 * // Example usage in a React component:
 * const getPanelStyle = useGetPanelStyleToCssStyle();
 * const panelStyle = {
 *   backgroundColor: "#fff",
 *   borderColor: "#000",
 *   borderWidth: 2,
 *   fontSize: 14,
 *   borderRadius: 5,
 *   backgroundImageType: BackgroundImageType.Url,
 *   backgroundImageValue: "https://example.com/image.png",
 * };
 * const cssStyle = getPanelStyle(panelStyle);
 * console.log(cssStyle);
 * // Outputs a CSSProperties object with corresponding styles.
 */
export const useGetPanelStyleToCssStyle = () => {
  const getCustomImageUrl = useGetCustomImageUrl();
  const hass = useHass();

  const customImagesUrlGetter = (imageId: string) => {
    const customImage = hass.customImages?.[imageId];
    if (!customImage) return "";
    return getCustomImageUrl(customImage);
  };

  return (
    panelStyle?: PanelFcStyleProperties,
    options?: PanelStyleToCssStyleOptions,
  ) => {
    return panelStyleToCssStyle(panelStyle, {
      customImagesUrlGetter,
      ...options,
    });
  };
};
