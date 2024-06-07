import {
  ENTITY_UNAVAILABLE,
  ENTITY_UNKNOWN,
  FrontendLocaleData,
  HassConfig,
  HassEntityState,
  UNIT_TO_MILLISECOND_CONVERT,
} from "@home-assistant-react/types/src";
import {
  formatDate,
  formatDateTime,
  formatNumber,
  formatTime,
  getNumberFormatOptions,
} from "../locale";
import { TimeZone } from "@home-assistant-react/types/src/home-assistant/frontend/translations";
import { isNumericFromAttributes } from "./common";
import { getDomainFromEntityId } from "./entities";
import { getBlankBeforePercent } from "../locale/getBlankBeforePercent";
import { formatDuration } from "../locale/formatDuration";
import { HassEntityRegistryDisplayEntry } from "@home-assistant-react/types/src/home-assistant/entities/hass-entity-registry-display-entry";

export const computeStateDisplayFromEntityAttributes = (
  localize: (id: string) => string,
  locale: FrontendLocaleData | undefined,
  config: HassConfig,
  entity: HassEntityRegistryDisplayEntry | undefined,
  entityId: string,
  attributes: Record<string, string>,
  state: string,
) => {
  if (!locale || state === ENTITY_UNKNOWN || state === ENTITY_UNAVAILABLE) {
    return localize(`state.default.${state}`);
  }

  // Entities with a `unit_of_measurement` or `state_class` are numeric values and should use `formatNumber`
  if (isNumericFromAttributes(attributes)) {
    // state is duration
    if (
      attributes.device_class === "duration" &&
      attributes.unit_of_measurement &&
      UNIT_TO_MILLISECOND_CONVERT[attributes.unit_of_measurement as never]
    ) {
      try {
        return formatDuration(state, attributes.unit_of_measurement);
      } catch (_err) {
        // fallback to default
      }
    }
    if (attributes.device_class === "monetary") {
      try {
        return formatNumber(state, locale, {
          style: "currency",
          currency: attributes.unit_of_measurement,
          minimumFractionDigits: 2,
          // Override monetary options with number format
          ...getNumberFormatOptions(
            { state, attributes } as HassEntityState,
            entity,
          ),
        });
      } catch (_err) {
        // fallback to default
      }
    }
    const unit = !attributes.unit_of_measurement
      ? ""
      : attributes.unit_of_measurement === "%"
        ? getBlankBeforePercent(locale) + "%"
        : ` ${attributes.unit_of_measurement}`;
    return `${formatNumber(
      state,
      locale,
      getNumberFormatOptions({ state, attributes } as HassEntityState, entity),
    )}${unit}`;
  }

  const domain = getDomainFromEntityId(entityId);

  if (domain === "datetime") {
    const time = new Date(state);
    return formatDateTime(time, locale, config.time_zone);
  }

  if (["date", "input_datetime", "time"].includes(domain)) {
    // If trying to display an explicit state, need to parse the explicit state to `Date` then format.
    // Attributes aren't available, we have to use `state`.

    // These are timezone agnostic, so we should NOT use the system timezone here.
    try {
      const components = state.split(" ");
      if (components.length === 2) {
        // Date and time.
        return formatDateTime(
          new Date(components.join("T")),
          { ...locale, time_zone: TimeZone.local },
          config.time_zone,
        );
      }
      if (components.length === 1) {
        if (state.includes("-")) {
          // Date only.
          return formatDate(
            new Date(`${state}T00:00`),
            { ...locale, time_zone: TimeZone.local },
            config.time_zone,
          );
        }
        if (state.includes(":")) {
          // Time only.
          const now = new Date();
          return formatTime(
            new Date(`${now.toISOString().split("T")[0]}T${state}`),
            { ...locale, time_zone: TimeZone.local },
            config.time_zone,
          );
        }
      }
      return state;
    } catch (_e) {
      // Formatting methods may throw error if date parsing doesn't go well,
      // just return the state string in that case.
      return state;
    }
  }

  // `counter` `number` and `input_number` domains do not have a unit of measurement but should still use `formatNumber`
  if (
    domain === "counter" ||
    domain === "number" ||
    domain === "input_number"
  ) {
    // Format as an integer if the value and step are integers
    return formatNumber(
      state,
      locale,
      getNumberFormatOptions({ state, attributes } as HassEntityState, entity),
    );
  }

  // state is a timestamp
  if (
    [
      "button",
      "event",
      "image",
      "input_button",
      "scene",
      "stt",
      "tts",
    ].includes(domain) ||
    (domain === "sensor" && attributes.device_class === "timestamp")
  ) {
    try {
      return formatDateTime(new Date(state), locale, config.time_zone);
    } catch (_err) {
      return state;
    }
  }

  return (
    (entity?.translation_key &&
      localize(
        `component.${entity.platform}.entity.${domain}.${entity.translation_key}.state.${state}`,
      )) ||
    // Return device class translation
    (attributes.device_class &&
      localize(
        `component.${domain}.entity_component.${attributes.device_class}.state.${state}`,
      )) ||
    // Return default translation
    localize(`component.${domain}.entity_component._.state.${state}`) ||
    // We don't know! Return the raw state.
    state
  );
};
