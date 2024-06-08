import { HassProviderInternalState } from "./HassProvider.types";
import {
  HassArea,
  HassConfig,
  HassCurrentUserData,
  HassEntityInfo,
  HassUserData,
} from "@home-assistant-react/types/src";
import { DashboardLoadingError } from "@home-assistant-react/types/src/errors";
import { mapArrayToRecord } from "@home-assistant-react/helpers/src";
import { Connection } from "home-assistant-js-websocket";

export const loadInitialStatesFromHomeAssistant = async (
  connection: Connection,
) => {
  const loadedStates: HassProviderInternalState = {
    areas: undefined,
    config: undefined,
    entitiesInfo: undefined,
    userData: undefined,
    loadedDashboard: undefined,
    locale: undefined,
    currentUser: undefined,
  };

  // Get the language from the browser
  const userLang = navigator.language;
  // Extract ISO 639-1 language code
  const language = userLang.split("-")[0];

  /*
   * Load home assistant base configuration
   * */

  try {
    loadedStates.config = await connection.sendMessagePromise<HassConfig>({
      type: "get_config",
    });
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant config",
      reason: e,
    });
  }

  /*
   * Load the current user info
   * */

  try {
    loadedStates.currentUser =
      await connection.sendMessagePromise<HassCurrentUserData>({
        type: "auth/current_user",
      });
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant current user info",
      reason: e,
    });
  }

  /*
   * Load the info of the user that generated the access token
   * */

  try {
    loadedStates.userData = (
      await connection.sendMessagePromise<{
        value: HassUserData;
      }>({
        type: "frontend/get_user_data",
      })
    )?.value;
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant logged user info",
      reason: e,
    });
  }

  /*
   * Load information on all the areas ( rooms ) of home assistant
   * */

  try {
    loadedStates.areas = mapArrayToRecord(
      await connection.sendMessagePromise<HassArea[]>({
        type: "config/area_registry/list",
        id: 4,
      }),
      "area_id",
    );
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant areas info",
      reason: e,
    });
  }

  /*
   * Load all the information about the entities of home assistant
   * that is not loaded from the entities states when requested
   * */

  try {
    loadedStates.entitiesInfo = mapArrayToRecord(
      await connection.sendMessagePromise<HassEntityInfo[]>({
        type: "config/entity_registry/list",
        id: 5,
      }),
      "entity_id",
    );
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant logged user info",
      reason: e,
    });
  }

  /*
   * Get localization messages for the current language from home assistant
   * */

  try {
    const entityComponentTranslations =
      (
        await connection.sendMessagePromise<{
          resources: Record<string, string>;
        }>({
          type: "frontend/get_translations",
          language,
          category: "entity_component",
        })
      )?.resources || {};

    const entityTranslations =
      (
        await connection.sendMessagePromise<{
          resources: Record<string, string>;
        }>({
          type: "frontend/get_translations",
          language,
          category: "entity",
        })
      )?.resources || {};

    const stateTranslations =
      (
        await connection.sendMessagePromise<{
          resources: Record<string, string>;
        }>({
          type: "frontend/get_translations",
          language,
          category: "state",
        })
      )?.resources || {};

    loadedStates.locale = {
      ...entityComponentTranslations,
      ...entityTranslations,
      ...stateTranslations,
    };
  } catch (e) {
    throw new DashboardLoadingError({
      message: "Failed to load home assistant translations",
      reason: e,
    });
  }

  return loadedStates;
};
