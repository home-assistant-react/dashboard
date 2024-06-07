import { FormControlWrapperProps } from "../../form";
import { IconValue } from "../IconPicker";

export interface IconPickerInputProps
  extends Omit<FormControlWrapperProps, "children"> {
  value?: IconValue;
  onChange?: (icon?: IconValue) => void;
  isClearable?: boolean;
  initialIconSet?: string;
}
