import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import {
  PanelEditorConfigSelect,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";
import { SelectItem, SelectSeparator } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";

export const PropertyControllerSelect: PropertyControllerFc<
  PanelEditorConfigSelect
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <SelectInput
        value={props.value || ""}
        onChangeValue={(value) =>
          props.onChange(value !== "" ? value : undefined)
        }
      >
        <SelectItem value={""}>
          {props.property.defaultLabel || "Default"}
        </SelectItem>
        <SelectSeparator />
        {props.property.options.map((option, optionKey) => (
          <SelectItem key={optionKey} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectInput>
    </PropertyControllerWrapper>
  );
};
