import { Layout as ReactGirdLayout } from "react-grid-layout";
import { PanelsGroupOptions } from "./panels-group-options";

export interface PanelsGroup extends ReactGirdLayout {
  panels: string[];
  groupOptions?: PanelsGroupOptions;
}
