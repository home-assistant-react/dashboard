import { FallbackPanel } from "@home-assistant-react/panel-fallback/src";
import { getPanelComponent } from "@home-assistant-react/api/src/dashboard";
import { logWarning } from "../console/logWarning";

/**
 * Retrieves a panel component by name, or returns a fallback component if the specified component is not found.
 *
 * @param componentName - The name of the panel component to retrieve. If not provided, the fallback component is used.
 * @param fallbackComponentName - The name of the fallback component to use if the specified component is not found. Default is `FallbackPanel`.
 * @returns The specified panel component if found, otherwise the fallback component.
 *
 * @example
 * // Example usage:
 * const panelComponent = getPanelComponentOrFallback('CustomPanel');
 * console.log(panelComponent); // Outputs the CustomPanel component if found, otherwise the FallbackPanel component.
 *
 * const fallbackPanelComponent = getPanelComponentOrFallback();
 * console.log(fallbackPanelComponent); // Outputs the FallbackPanel component.
 */
export const getPanelComponentOrFallback = (
  componentName?: string,
  fallbackComponentName = FallbackPanel,
) => {
  if (!componentName) return fallbackComponentName;

  try {
    if (componentName) {
      return getPanelComponent(componentName);
    }
  } catch (e) {
    logWarning(
      `Panel ${componentName} not found. Using ${fallbackComponentName} instead.`,
    );
  }

  return fallbackComponentName;
};
