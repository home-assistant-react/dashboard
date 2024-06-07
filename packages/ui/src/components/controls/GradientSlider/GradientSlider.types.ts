import { GradientInfo } from "@home-assistant-react/helpers/src/css/parse-gradient-string";

export interface GradientSliderProps {
  gradient?: GradientInfo | null;
  onChange?: (gradient: GradientInfo) => void;
}
