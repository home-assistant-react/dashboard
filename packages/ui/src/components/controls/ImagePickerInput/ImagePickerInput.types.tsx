import { FormControlWrapperProps } from "../../form";
import { ImageValue } from "../ImagePicker/ImagePicker.types";

export interface ImagePickerInputProps
  extends Omit<FormControlWrapperProps, "children"> {
  value?: ImageValue;
  onChange?: (imageValue?: ImageValue) => void;
  isClearable?: boolean;
}
