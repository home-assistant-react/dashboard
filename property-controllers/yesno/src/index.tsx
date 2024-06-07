import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import {
  PanelEditorConfigVisibility,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";
import { SelectItem, SelectSeparator } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";

const options = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

export const PropertyControllerYesNo: PropertyControllerFc<
  PanelEditorConfigVisibility
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <SelectInput
        value={props.value === true ? "Yes" : props.value === false ? "No" : ""}
        onChangeValue={(value) =>
          props.onChange(value !== "" ? value === "Yes" : undefined)
        }
      >
        <SelectItem value={""}>Default</SelectItem>
        <SelectSeparator />
        {options.map((option, optionKey) => (
          <SelectItem key={optionKey} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectInput>
    </PropertyControllerWrapper>
  );
};
