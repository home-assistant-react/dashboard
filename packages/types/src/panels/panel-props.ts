import { PanelsGroup } from "./panels-group";
import { Panel } from "./panel";
import { CSSProperties } from "react";

export interface PanelProps {
  group: PanelsGroup;
  panel: Panel;
  isInGroup?: boolean;
  style?: CSSProperties;
}
