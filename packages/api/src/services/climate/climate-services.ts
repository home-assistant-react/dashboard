import { HvacMode } from "@home-assistant-react/types/src/home-assistant/entities-state/climate";
import { callService, Connection } from "home-assistant-js-websocket";
import { ClimateState } from "@home-assistant-react/types/src";
import { logError } from "@home-assistant-react/helpers/src";

export class ClimateServiceError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ClimateServiceError.prototype);
  }
}

export interface ClimateServicesOptions {
  hvac_mode?: HvacMode;
}
export class ClimateServices {
  constructor(
    public connection: Connection,
    public state?: Partial<ClimateState>,
  ) {}

  async runService(
    entityId: string | undefined,
    service: string,
    options?: ClimateServicesOptions,
  ) {
    if (!entityId) throw new ClimateServiceError("Entity id not provided");
    const { ...rest } = options || {};
    try {
      return await callService(this.connection, "climate", service, {
        entity_id: entityId,
        ...rest,
      });
    } catch (err) {
      logError(err);
    }
  }

  async setHvacMode(options?: ClimateServicesOptions) {
    return this.runService(this.state?.entity_id, "set_hvac_mode", options);
  }
}
