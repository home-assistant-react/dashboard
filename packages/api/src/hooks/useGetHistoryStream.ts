import React from "react";
import { useHass } from "./providers";

/**
 * Represents the historical state value of an entity at a specific point in time.
 * @interface EntityHistoryValue
 * @property {string} s - The state of the entity.
 * @property {number} lu - The last update timestamp of the entity's state.
 */
export interface EntityHistoryValue {
  s: string;
  lu: number;
}

/**
 * Describes the return type for the useGetHistoryStream hook, providing historical data of specified entities.
 * @interface UseGetHistoryStreamReturn
 * @property {number} end_time - The ending timestamp of the historical data period.
 * @property {number} start_time - The starting timestamp of the historical data period.
 * @property {Record<"entity_id", EntityHistoryValue[]>} states - An object with entity IDs as keys and arrays of their historical states.
 */
export interface UseGetHistoryStreamReturn<Entities extends readonly string[]> {
  end_time: number;
  start_time: number;
  states: { [key in Entities[number]]: EntityHistoryValue[] };
}

/**
 * Options to customize the behavior of the history stream retrieval.
 * @interface UseGetHistoryStreamOptions
 * @property {boolean} [minimal_response=true] - If true, reduces the amount of data returned per state change.
 * @property {boolean} [no_attributes=true] - If true, attributes of the state changes are omitted.
 * @property {boolean} [significant_changes_only=true] - If true, only state changes considered significant are returned.
 * @property {Date} [end_time] - Specific end time for the historical data request.
 * @property {number} [refresh_interval=0] - Interval in milliseconds to refresh data; 0 means no refresh.
 */
export interface UseGetHistoryStreamOptions {
  minimal_response?: boolean;
  no_attributes?: boolean;
  significant_changes_only?: boolean;
  end_time?: Date;
  // 0 means no refresh
  refresh_interval?: number;
}

/**
 * Hook to subscribe to and stream historical state changes of specified entities.
 * Utilizes the home assistant websocket API to fetch the history.
 *
 * @template Entities extends readonly string[]
 * @param {readonly string[]} entities - Array of entity IDs whose history is to be streamed.
 * @param {Date} startDate - Start date for the historical data period.
 * @param {UseGetHistoryStreamOptions} [options] - Optional settings to adjust the response of the history data.
 * @returns {UseGetHistoryStreamReturn<Entities> | undefined} An object containing historical data of the entities, or undefined if an error occurs.
 */
export const useGetHistoryStream = <Entities extends readonly string[]>(
  entities: [...Entities],
  startDate: Date,
  options?: UseGetHistoryStreamOptions,
): UseGetHistoryStreamReturn<Entities> | undefined => {
  const { connection } = useHass();
  const interalRef = React.useRef<NodeJS.Timeout>();
  const [history, setHistory] = React.useState<
    UseGetHistoryStreamReturn<Entities> | undefined
  >();

  React.useEffect(() => {
    let messageUnsubscribe: () => Promise<void> | undefined;
    let interval: NodeJS.Timeout;

    if (entities.some((entity) => !entity)) return;

    const getData = async () => {
      if (messageUnsubscribe) messageUnsubscribe();

      messageUnsubscribe = await connection.subscribeMessage(
        (result) => {
          setHistory(result as UseGetHistoryStreamReturn<Entities>);
        },
        {
          id: connection.commandId,
          type: "history/stream",
          entity_ids: entities,
          minimal_response: options?.minimal_response ?? true,
          no_attributes: options?.no_attributes ?? true,
          significant_changes_only: options?.significant_changes_only ?? true,
          start_time: startDate || new Date(),
          end_time: options?.end_time,
        },
      );
    };

    getData().then();

    if (options?.refresh_interval)
      interval = setInterval(getData, options.refresh_interval);

    return () => {
      if (messageUnsubscribe) messageUnsubscribe();
      if (interval) clearInterval(interval);
    };
  }, []);

  return history;
};
