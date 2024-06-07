import { useDashboard } from "@home-assistant-react/api/src";
import { getDashboardWindowStore } from "@home-assistant-react/api/src/dashboard";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { AuthData, Sidebar } from "@home-assistant-react/types/src";
import { DashboardLoadingError } from "@home-assistant-react/types/src/errors";
import React from "react";

interface Sidebars {
  left: Sidebar[];
  right: Sidebar[];
  top: Sidebar[];
  bottom: Sidebar[];
}

/**
 * Returns an object containing arrays of dashboard sidebars categorized by their position: left, right, top, and bottom.
 */
export function useGetDashboardSidebars() {
  const { sidebars: stateSidebars } = useDashboard();

  return React.useMemo<Sidebars>(() => {
    return {
      left:
        stateSidebars.filter((dashboard) => dashboard.position === "left") ||
        [],
      right:
        stateSidebars.filter((dashboard) => dashboard.position === "right") ||
        [],
      top:
        stateSidebars.filter((dashboard) => dashboard.position === "top") || [],
      bottom:
        stateSidebars.filter((dashboard) => dashboard.position === "bottom") ||
        [],
    };
  }, [sanitizeDep(stateSidebars)]);
}

/**
 * Waits until all plugins are loaded.
 * Continuously checks if all plugins are loaded using an interval,
 * and updates the loading state accordingly.
 * @returns A boolean value indicating whether all plugins are loaded.
 */
export function useWaitForAllPluginsToLoad() {
  const isLoaded = useBooleanValue(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Check if all plugins are loaded using the DashboardWindowStore
      if (getDashboardWindowStore().isAllPluginsLoaded()) {
        // If all plugins are loaded, update the loading state and clear the interval
        isLoaded.setTrue();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isLoaded.value;
}

/**
 * Checks if the provided authentication data contains both Home Assistant URL and access token.
 * If any of them is missing, it throws a DashboardLoadingError with appropriate error message.
 * @param authData - Optional authentication data containing Home Assistant URL and access token.
 * @throws {DashboardLoadingError} Throws an error if Home Assistant URL or access token is missing.
 * The error contains a message indicating the issue, the reason for the error, and whether to show a reset configuration option.
 */
export function checkForApiConfiguration(authData?: AuthData) {
  // Check if both Home Assistant URL and access token are present in the authentication data
  if (!!authData?.hassUrl && !!authData?.access_token) return;

  // Throw a DashboardLoadingError if Home Assistant URL or access token is missing
  throw new DashboardLoadingError({
    message: "Something went wrong with the configuration",
    reason: "HassUrl or Access Token not found",
    showResetConfiguration: true,
  });
}
