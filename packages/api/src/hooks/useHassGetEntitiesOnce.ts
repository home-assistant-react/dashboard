import {
  HassEntitiesState,
  HassEntityState,
} from "@home-assistant-react/types/src";
import React from "react";
import { getDomainFromEntityId } from "@home-assistant-react/helpers/src/home-assistant";
import { useHass } from "./providers";

/**
 * Fetches and returns entities from Home Assistant API once.
 *
 * @summary Use this function to fetch and return entities from Home Assistant API.
 *
 * @since 1.0.0
 *
 * @param {Object} options - The options object.
 * @param {string} options.domain - The domain to filter the entities by. (optional)
 *
 * @returns {HassEntitiesState<T> | undefined} The entities fetched from Home Assistant API.
 *
 * @example
 *
 * const options = {
 *   domain: "light"
 * };
 *
 * const entities = useHassGetEntitiesOnce(options);
 */
export const useHassGetEntitiesOnce = <T = HassEntitiesState>(options?: {
  domain?: string;
}): HassEntitiesState<T> | undefined => {
  const { areas, entitiesInfo, isLoaded, loadedEntities } = useHass();
  const [entities, setEntities] = React.useState<HassEntitiesState<T>>();

  React.useEffect(() => {
    if (!isLoaded) return;

    /**
     * Creates an object containing entities information based on loaded entries.
     *
     * @param {Object} loadedEntities - The loaded entries containing entity data.
     * @param {Object} options - Optional parameters for filtering entities based on domain.
     * @param {Object} entitiesInfo - Additional information about entities.
     * @param {Object} areas - Mapping of area IDs to their respective areas.
     * @return {Object} - The object containing entities information.
     */
    const _entities = Object.keys(loadedEntities.current || {}).reduce(
      (previousValue, entityId) => {
        const domain = getDomainFromEntityId(entityId);
        if (options?.domain && domain !== options.domain) return previousValue;
        const _entity = {
          ...loadedEntities.current?.[entityId],
        } as HassEntityState<T>;
        _entity.area = entitiesInfo?.[entityId]?.area_id
          ? areas[entitiesInfo[entityId].area_id || ""]
          : undefined;
        _entity.info = entitiesInfo?.[entityId];
        _entity.domain = domain;
        return { ...previousValue, [entityId]: _entity };
      },
      {},
    );
    setEntities(_entities);
  }, [isLoaded]);

  return entities;
};
