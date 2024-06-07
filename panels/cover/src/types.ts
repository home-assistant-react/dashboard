import {
  DirectionStrategy,
  UseDisclosureReturn,
  VisibilityStrategy,
} from "@home-assistant-react/types/src";
import { LongPressHandler } from "@home-assistant-react/hooks/src";
import { CoverState } from "@home-assistant-react/types/src/home-assistant/entities-state/cover";
import { IconValue } from "@home-assistant-react/ui/src";
import { CSSProperties } from "react";

export interface CoverOptions {
  direction?: string;
  headerDirection?: DirectionStrategy;
  entity_id: string;
  halfPosition?: number;
  glimmerPosition?: number;
  showHalfButton?: VisibilityStrategy;
  showGlimmerButton?: VisibilityStrategy;
  showStopButton?: VisibilityStrategy;
  showCloseButton?: VisibilityStrategy;
  showOpenButton?: VisibilityStrategy;
  showTitle?: VisibilityStrategy;
  icon_open?: IconValue;
  icon_closed?: IconValue;
  icon_opening?: IconValue;
  icon_closing?: IconValue;
  icon_button_open?: IconValue;
  icon_button_close?: IconValue;
  icon_button_stop?: IconValue;
  icon_button_glimmer?: IconValue;
  icon_button_half?: IconValue;
}

export interface CoverButtonProps {
  button?: string;
  isPanelButton?: boolean;
  onLongPress?: LongPressHandler;
  customStyle?: CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
  isVertical?: boolean;
}

export interface CoverPanelState {
  entityState: CoverState;
  state: string;
  options?: CoverOptions;
  moreModalDisclosure: UseDisclosureReturn;
}
