import { callService, Connection } from "home-assistant-js-websocket";
import { CoverState } from "@home-assistant-react/types/src";

export class CoverServiceError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CoverServiceError.prototype);
  }
}

export interface CoverServicesOptions {
  entityId?: string;
  position?: number;
}
export class CoverServices {
  constructor(
    public connection: Connection,
    public state?: Partial<CoverState>,
  ) {}

  async runService(
    entityId: string | undefined,
    service: string,
    options?: CoverServicesOptions,
  ) {
    if (!entityId) throw new CoverServiceError("Entity id not provided");
    return callService(this.connection, "cover", service, {
      entity_id: entityId,
      ...options,
    });
  }

  async open(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "open_cover", options);
  }
  async close(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "close_cover", options);
  }
  async stop(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "stop_cover", options);
  }
  async openTilt(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "open_cover_tilt", options);
  }
  async closeTilt(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "close_cover_tilt", options);
  }
  async stopTilt(options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "stop_cover_tilt", options);
  }
  async setPosition(position: number, options?: CoverServicesOptions) {
    return this.runService(this.state?.entity_id, "set_cover_position", {
      ...options,
      position,
    });
  }
}
