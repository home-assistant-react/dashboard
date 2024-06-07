import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import {
  DirectionStrategy,
  PanelEditorConfigDirection,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";
import { SelectItem, SelectSeparator } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";

const options = [
  {
    value: DirectionStrategy.Top,
    label: "Top",
  },
  {
    value: DirectionStrategy.Bottom,
    label: "Bottom",
  },
  {
    value: DirectionStrategy.Left,
    label: "Left",
  },
  {
    value: DirectionStrategy.Right,
    label: "Right",
  },
];

export const PropertyControllerDirection: PropertyControllerFc<
  PanelEditorConfigDirection
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
