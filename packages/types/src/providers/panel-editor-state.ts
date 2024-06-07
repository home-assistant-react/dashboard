import {
  Panel,
  PanelFcStyleProperties,
  PanelsGroup,
  PanelsGroupOptions,
} from "../panels";
import { DashboardStateWithMethods } from "../dashboard-state";

export interface PanelEditorState {
  sidebarId?: string;
  panel?: Panel;
  group?: PanelsGroup;
  updateOptions: (optionKey: string, optionValue: unknown) => void;
  updateGroupOption: (optionKey: string, optionValue: unknown) => void;
  deletePanel: () => void;
  updateStyle: <
    T extends keyof PanelFcStyleProperties = keyof PanelFcStyleProperties,
  >(
    styleKey: string,
    styleProp: T,
    styleValue: PanelFcStyleProperties[T],
  ) => void;
  hasChanges: boolean;
  groupOptions: PanelsGroupOptions;
  movePanelToGroup: DashboardStateWithMethods["movePanelToGroup"];
}
