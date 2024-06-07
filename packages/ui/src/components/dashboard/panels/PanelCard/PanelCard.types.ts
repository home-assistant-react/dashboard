import { PanelsGroup } from "@home-assistant-react/types/src";

export interface PanelCardProps {
  panelId?: string;
  panelComponent?: string;
  isInGroup?: boolean;
  hasShadow?: boolean;
  className?: string;
  group?: PanelsGroup;
  isGhost?: boolean;
}
