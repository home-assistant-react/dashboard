import { TextInputPropsWithFormControl } from "../../../form/TextInput";

export interface DebouncedInputProps extends TextInputPropsWithFormControl {
  delay?: number;
  onChangeValue?: (value: string) => void;
  isClearable?: boolean;
}
