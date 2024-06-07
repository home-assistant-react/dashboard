import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import {
  DEFAULT_GRID_PANEL_H,
  DEFAULT_GRID_PANEL_W,
} from "@home-assistant-react/defines/src";

/**
 * Retrieves the standard panel size (width and height) for a specified component name.
 * If the component has predefined dimensions, they are used; otherwise, default dimensions are applied.
 *
 * @param componentName - The name of the panel component for which to retrieve the size.
 * @returns An object containing the width (`w`) and height (`h`) of the panel.
 *
 * @example
 * // Example usage:
 * const panelSize = getStandardPanelSize('CustomPanel');
 * console.log(panelSize); // Outputs: { w: <width>, h: <height> }
 */
export const getStandardPanelSize = (componentName: string) => {
  const result = { w: DEFAULT_GRID_PANEL_W, h: DEFAULT_GRID_PANEL_H };

  try {
    const component = getPanelComponent(componentName);
    result.w = component.defaultPanelWidth || DEFAULT_GRID_PANEL_W;
    result.h = component.defaultPanelHeight || DEFAULT_GRID_PANEL_H;
  } catch (e) {
    return result;
  }

  return result;
};
