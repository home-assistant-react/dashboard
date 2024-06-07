import { cn } from "@home-assistant-react/ui/src";
import { IconPickerInput } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";
import {
  PanelEditorConfigIcon,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";

export const PropertyControllerIcon: PropertyControllerFc<
  PanelEditorConfigIcon
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <IconPickerInput
        className={cn("w-full")}
        value={props.value || ""}
        onChange={(value) => props.onChange(value)}
      />
    </PropertyControllerWrapper>
  );
};
