import {
  PanelEditorConfigVisibility,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";
import { SwitchInput } from "@home-assistant-react/ui/src/form/SwitchInput";

export const PropertyControllerToggle: PropertyControllerFc<
  PanelEditorConfigVisibility
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <SwitchInput
        value={props.value === true}
        onChangeValue={(value) => props.onChange(value)}
      ></SwitchInput>
    </PropertyControllerWrapper>
  );
};
