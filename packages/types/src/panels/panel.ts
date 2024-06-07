import { PanelFcStyleProperties } from "./panel-fc";
import { PanelOptions } from "./panel-options";

export interface Panel<TPanelOptions extends PanelOptions = PanelOptions> {
  id: string;
  component: string;
  options?: TPanelOptions;
  styles?: Record<string, PanelFcStyleProperties>;
}
