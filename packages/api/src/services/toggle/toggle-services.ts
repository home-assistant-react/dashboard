import { callService, Connection } from "home-assistant-js-websocket";
import { HassEntityState } from "@home-assistant-react/types/src";
export class ToggleServices {
  constructor(
    public connection: Connection,
    public state?: Partial<HassEntityState>,
  ) {}

  async turnOn() {
    return await callService(
      this.connection,
      String(this.state?.entity_id).split(".")?.[0] || "",
      "turn_on",
      {
        entity_id: this.state?.entity_id,
      },
    );
  }

  async turnOff() {
    return await callService(
      this.connection,
      String(this.state?.entity_id).split(".")?.[0] || "",
      "turn_off",
      {
        entity_id: this.state?.entity_id,
      },
    );
  }
}
