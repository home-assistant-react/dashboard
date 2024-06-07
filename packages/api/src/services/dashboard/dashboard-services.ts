import { callService, Connection } from "home-assistant-js-websocket";
import { DashboardState } from "@home-assistant-react/types/src";

export interface DashboardServicesOptions {
  state?: string;
  name?: string;
}
export class DashboardServices {
  constructor(public connection: Connection) {}

  runService = async (service: string, options?: DashboardServicesOptions) => {
    return callService(
      this.connection,
      "react_dashboard",
      service,
      options || {},
    );
  };

  async update(name: string, state: DashboardState) {
    return await this.runService("update_state", {
      state: JSON.stringify(state),
      name,
    });
  }
  async getState() {
    return await this.runService("get_state");
  }
}
