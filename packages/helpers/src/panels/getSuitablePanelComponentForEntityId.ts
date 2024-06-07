import { getDomainFromEntityId } from "../home-assistant";
import { getDashboardWindowStore } from "@home-assistant-react/api/src/dashboard";

/**
 * Determines the most suitable panel component for a given entity ID based on its domain.
 * If no specific panel component is registered for the entity's domain, a default panel component is returned.
 *
 * @param entityId - The entity ID for which to find a suitable panel component.
 * @returns The name of the most suitable panel component for the entity's domain, or "Sensor" if no specific panel is found.
 *
 * @example
 * // Example usage:
 * const panelComponent = getSuitablePanelComponentForEntityId('light.living_room');
 * console.log(panelComponent); // Outputs the suitable panel component name for the 'light' domain, or "Sensor" if not found.
 */
export const getSuitablePanelComponentForEntityId = (entityId: string) => {
  const domain = getDomainFromEntityId(entityId);
  const registeredPanels = getDashboardWindowStore().getLoadedPanels();

  for (const panelName in registeredPanels) {
    const panel = registeredPanels[panelName];
    if (
      Array.isArray(panel.suitableForDomains) &&
      panel.suitableForDomains.includes(domain)
    ) {
      return panelName;
    }
  }

  return "Sensor";
};
