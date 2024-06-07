import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import {
  PanelEditorConfigVisibility,
  PropertyControllerFc,
  VisibilityStrategy,
} from "@home-assistant-react/types/src";
import { SelectItem, SelectSeparator } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";

const options = [
  {
    value: VisibilityStrategy.None,
    label: "No",
  },
  {
    value: VisibilityStrategy.Both,
    label: "Card e Modal",
  },
  {
    value: VisibilityStrategy.CardOnly,
    label: "Solo card",
  },
  {
    value: VisibilityStrategy.ModalOnly,
    label: "Solo in modal",
  },
];

export const PropertyControllerVisibility: PropertyControllerFc<
  PanelEditorConfigVisibility
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <SelectInput
        value={props.value || ""}
        onChangeValue={(value) =>
          props.onChange(value !== "" ? value : undefined)
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
