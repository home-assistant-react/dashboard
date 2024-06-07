import { FormControlWrapperProps } from "../../form";
import { EntityPickerProps } from "../EntityPicker";

type PickedPickerProps = "entities";

export interface EntityPickerInputProps
  extends FormControlWrapperProps,
    Pick<EntityPickerProps, PickedPickerProps> {
  entityPickerProps?: Omit<EntityPickerProps, PickedPickerProps>;
  onValueChange?: (entityId: string) => void;
  value?: string;
}
