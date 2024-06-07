import { TextInput } from "@home-assistant-react/ui/src/form/TextInput";
import { cn } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";
import {
  PanelEditorConfigText,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";

export const PropertyControllerText: PropertyControllerFc<
  PanelEditorConfigText
> = (props) => {
  return (
    <PropertyControllerWrapper {...props}>
      <TextInput
        className={cn("w-full")}
        value={props.value || ""}
        onChange={(e) =>
          props.onChange(e.target.value !== "" ? e.target.value : undefined)
        }
      />
    </PropertyControllerWrapper>
  );
};
