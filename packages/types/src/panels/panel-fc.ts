import { CSSProperties, FC, ReactNode } from "react";
import { CallbackOrType } from "../common/callback-or-type";
import { StyleEditorCategory } from "../style-editor";
import { Panel } from "./panel";
import { PanelsGroup } from "./panels-group";
import { PanelEditorConfig } from "../editor";
import { HassEntityState } from "../home-assistant";
import {
  CUSTOM_BORDER_COLOR_CSS_VAR,
  CUSTOM_BORDER_WIDTH_CSS_VAR,
} from "../defines";
import { PanelOptions } from "./panel-options";

export interface PanelFCGetIconOptions {
  panel?: Panel;
  size?: number | string;
}

export interface PanelFCGetLabelOptions {
  panel?: Panel;
}

export interface PanelFCGetIsButtonOptions<
  T extends PanelOptions = PanelOptions,
> {
  panel?: Panel<T>;
}

export interface PanelComponentProps<T extends PanelOptions = PanelOptions> {
  panel: Panel<T>;
  group: PanelsGroup;
  isGrouped: boolean;
}

export enum BackgroundImageType {
  Url = "url",
  Custom = "Custom",
}

export interface PanelFcStyleProperties
  extends Pick<
    CSSProperties,
    | "backgroundColor"
    | "color"
    | "margin"
    | "padding"
    | "backgroundPositionX"
    | "backgroundPositionY"
    | "backgroundSize"
    | "backgroundRepeat"
    | "borderColor"
    | "borderWidth"
    | "fontSize"
    | "borderRadius"
    | "borderTopLeftRadius"
    | "borderTopRightRadius"
    | "borderBottomLeftRadius"
    | "borderBottomRightRadius"
    | "fill"
    | "stroke"
    | "paddingTop"
    | "paddingRight"
    | "paddingBottom"
    | "paddingLeft"
  > {
  customBackgroundImage?: { image: string; set: string };
  backgroundGradient?: string;
  backgroundImageType?: BackgroundImageType;
  backgroundImageValue?: string;
  noShadow?: boolean;
  shadowColor?: string;
  shadowShiftRight?: number;
  shadowShiftDown?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowOpacity?: number;
  shadowInset?: boolean;
}

export interface PanelFcCustomStyle {
  title: string;
  description?: string;
  style?: PanelFcStyleProperties;
  enabledCategories?: StyleEditorCategory[];
}

export type CustomStyles = Record<string, PanelFcCustomStyle>;

export type PanelGetIconCallback = (
  entityState?: HassEntityState,
  options?: PanelFCGetIconOptions,
) => ReactNode;

export type PanelGetActionCallback = (
  entityState?: HassEntityState,
  options?: PanelFCGetLabelOptions,
) => string;

export type PanelFC<T extends PanelOptions = PanelOptions> = FC<
  PanelComponentProps<T>
> & {
  panelInitialStyle?: CSSProperties;
  previewPanel?: FC;
  previewPanelDescription?: ReactNode;
  configOptions?: PanelEditorConfig<T>;
  getIcon?: PanelGetIconCallback;
  getLabel?: PanelGetActionCallback;
  customStyles?: CustomStyles;
  hasPanelCard?: boolean; // Default true
  isPushButton?: CallbackOrType<boolean, PanelFCGetIsButtonOptions<T>>; // Default false
  defaultPanelWidth?: number;
  defaultPanelHeight?: number;
  defaultOptions?: Partial<T>;
  suitableForDomains?: string[];
  enabledContextMenu?: boolean;
  isGroupPanel?: boolean;
};

export type CSSPropertiesWithCustomVars = CSSProperties & {
  [CUSTOM_BORDER_COLOR_CSS_VAR]?: string;
  [CUSTOM_BORDER_WIDTH_CSS_VAR]?: string;
};
