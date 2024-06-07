import { FormControlWrapperProps } from "../../form";
import { GradientInfo } from "@home-assistant-react/helpers/src/css/parse-gradient-string";

export interface GradientEditorInputProps extends FormControlWrapperProps {
  value?: string;
  onChange?: (value: string, gradient: GradientInfo) => void;
}
