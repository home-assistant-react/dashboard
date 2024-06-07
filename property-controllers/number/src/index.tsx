import { NumberInput } from "@home-assistant-react/ui/src/form/NumberInput";
import { cn } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";
import {
  PanelEditorConfigNumber,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";

export const PropertyControllerNumber: PropertyControllerFc<
  PanelEditorConfigNumber
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <NumberInput
        className={cn("w-full")}
        value={props.value || ""}
        onChange={(e) =>
          props.onChange(e.target.value !== "" ? e.target.value : undefined)
        }
      />
    </PropertyControllerWrapper>
  );
};
