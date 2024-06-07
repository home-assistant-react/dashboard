import { useDashboard } from "@home-assistant-react/api/src";
import React from "react";
import { SelectItem } from "../../components";
import {
  SelectInput,
  SelectInputPropsWithFormControl,
} from "../../form/SelectInput";

export interface ViewSelectInputProps
  extends Omit<SelectInputPropsWithFormControl, "children"> {}

export const ViewSelectInput = React.forwardRef<
  React.ElementRef<typeof SelectInput>,
  ViewSelectInputProps
>((props, ref) => {
  const { views } = useDashboard();
  return (
    <SelectInput {...props} ref={ref}>
      <SelectItem value={"all"}>All views</SelectItem>
      {views.map((view) => (
        <SelectItem key={view.id} value={view.id}>
          {view.name}
        </SelectItem>
      ))}
    </SelectInput>
  );
});

ViewSelectInput.displayName = "ViewSelectInput";
