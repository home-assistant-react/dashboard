import {
  Panel,
  PanelFcStyleProperties,
  PanelsGroup,
  PanelsGroupOptions,
} from "./panels";
import { NewPanelData } from "./editor";
import { CloudIntegrations } from "./api";
import { CustomSvgIcons } from "./ui";

export interface DraggingPanelInfo {
  w?: number;
  h?: number;
  i?: string;
}

export interface Sidebar {
  id: string;
  position: "left" | "right" | "top" | "bottom";
  order: number;
  groups: PanelsGroup[];
  description?: string;
  size?: number;
  gridGapHorizontal?: number;
  gridGapVertical?: number;
}

export interface MappedSidebar extends Sidebar {
  isMapped: boolean;
  isColumn?: boolean;
}

export interface DashboardSettings {
  showViewSelector?: "always" | "never" | "auto";
  viewSelectorPosition?: "top" | "bottom" | "left" | "right";
}

export interface DashboardView {
  id: string;
  name: string;
  gridGapHorizontal?: number;
  gridGapVertical?: number;
  gridPaddingHorizontal?: number;
  gridPaddingVertical?: number;
  icon?: CustomSvgIcons;
  layout: PanelsGroup[];
  gridOptions?: {
    rowsHeight: number;
    columns?: number;
    itemsMarginX?: number;
    itemsMarginY?: number;
    containerPaddingX?: number;
    containerPaddingY?: number;
  };
  order: number;
}

export interface ThemeStyles {
  theme: "light" | "dark";
  views: Record<
    string,
    {
      styles: Partial<
        Record<
          "colors" | "background" | "panels" | "view-panels" | "sidebar-panels",
          Record<string, unknown>
        >
      >;
    }
  >;
}

export interface DashboardState {
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  views: DashboardView[];
  layout: PanelsGroup[];
  sidebars: Sidebar[];
  panels: Record<string, Panel>;
  style?: PanelFcStyleProperties;
  theme?: ThemeStyles[];
  id?: string;
  settings: DashboardSettings;
  /*gridOptions?: {
    rowsHeight: number;
    columns?: number;
    itemsMarginX?: number;
    itemsMarginY?: number;
    containerPaddingX?: number;
    containerPaddingY?: number;
  };*/
}

export interface AddPanelReturn {
  panel: Panel;
  group?: PanelsGroup;
}

export interface MovePanelToGroupOptions {
  beforePanelId?: string;
  afterPanelId?: string;
  fromSidebarId?: string;
  toSidebarId?: string;
  fromViewId?: string;
  toViewId?: string;
}

export interface UpdateGroupOptionsOptions {
  sidebarId?: string;
  viewId?: string;
}

export interface DashboardStateWithMethods extends DashboardState {
  updateState: (state: DashboardState) => Promise<void>;
  updateGroupOptions: (
    groupId: PanelsGroup,
    groupOptions: PanelsGroupOptions,
    options?: UpdateGroupOptionsOptions,
  ) => Promise<void>;
  addPanel: (
    panel: NewPanelData,
    callback?: (result: AddPanelReturn) => void,
  ) => void;
  updatePanel: (panel: Panel) => void;
  deletePanel: (viewId: string, panel: Panel) => void;
  deletePanelFromSidebar: (panel: Panel, sidebarId: string) => void;
  deleteGroup: (viewId: string, groupId: string) => void;
  deleteGroupFromSidebar: (groupId: string, sidebarId: string) => void;
  integrations: CloudIntegrations["integrations"];
  refreshIntegrations: () => Promise<void>;
  movePanelToGroup: (
    panelId: string,
    groupId: string,
    options?: MovePanelToGroupOptions,
  ) => Promise<void>;
  selectedDashboardView: string | null;
  setSelectedDashboardView: (section: string) => void;
  addSidebar: (sidebar: Partial<Sidebar>) => void;
  updateSidebar: (sidebar: Partial<Sidebar>) => void;
  deleteSidebar: (sidebarId: string) => void;
  addView: (view: Partial<DashboardView>) => void;
  updateView: (view: Partial<DashboardView>) => void;
  updateThemeOptions: (theme: ThemeStyles[]) => void;
  deleteView: (viewId: string) => void;
  updateSettings: (settings: Partial<DashboardSettings>) => void;
}

export const defaultDashboardOptions: Partial<DashboardSettings> = {
  showViewSelector: "auto",
  viewSelectorPosition: "top",
};
