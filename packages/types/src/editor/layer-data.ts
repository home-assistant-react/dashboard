import { Panel } from "../panels";

export interface LayerData {
  panel: Panel;
  groupId: string;
  depth: number;
  isRemoved?: boolean;
  title?: string;
}
