import { callService, Connection } from "home-assistant-js-websocket";
import { ScriptState } from "@home-assistant-react/types/src";

export class ScriptServiceError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ScriptServiceError.prototype);
  }
}

export interface ScriptServicesOptions {
  entityId?: string;
  position?: number;
}
export class ScriptServices {
  constructor(
    public connection: Connection,
    public state?: Partial<ScriptState>,
  ) {}

  async runService(
    entityId: string | undefined,
    service: string,
    options?: ScriptServicesOptions,
  ) {
    if (!entityId) throw new ScriptServiceError("Entity id not provided");
    return callService(this.connection, "script", service, {
      entity_id: entityId,
      ...options,
    });
  }

  async turnOn(options?: ScriptServicesOptions) {
    return this.runService(this.state?.entity_id, "turn_on", options);
  }
  async turnOff(options?: ScriptServicesOptions) {
    return this.runService(this.state?.entity_id, "turn_off", options);
  }
}
