import {
  HassEntitiesState,
  HassEntityState,
} from "@home-assistant-react/types/src";
import { subscribeEntities } from "home-assistant-js-websocket";
import React from "react";
import { useHass } from "./providers";

export type UseHassGetEntityReturn<T> = HassEntityState<T>;

/**
 * Returns the current state of a Home Assistant entity.
 *
 * @template T - The type of entity state.
 * @param {string} entityId - The ID of the entity.
 * @returns {HassEntityState<T> | undefined} - The current state of the entity, or undefined if the entity does not exist.
 */
export const useHassGetEntity = <T>(
  entityId: string,
): UseHassGetEntityReturn<T> | undefined => {
  const { connection, areas, entitiesInfo } = useHass();
  const entity = React.useRef<HassEntityState<T>>();
  const [, setLastChanged] = React.useState<string | undefined>();

  React.useEffect(() => {
    return subscribeEntities(connection, (entities: HassEntitiesState) => {
      if (!entityId) return;
      if (entities[entityId]) {
        const _entity = { ...entities[entityId] };
        _entity.area = entitiesInfo?.[entityId]?.area_id
          ? areas[entitiesInfo[entityId].area_id || ""]
          : undefined;
        _entity.info = entitiesInfo?.[entityId];
        if (
          !entity.current ||
          _entity.last_changed !== entity.current?.last_changed
        ) {
          entity.current = { ..._entity };
          setLastChanged(entity.current.last_changed);
        } else if (_entity.last_updated !== entity.current?.last_updated) {
          entity.current = { ..._entity };
          setLastChanged(entity.current.last_updated);
        }
      }
    });
  }, [areas, entitiesInfo]);

  return entity.current;
};
