import { Sidebar } from "@home-assistant-react/types/src";
import { SelectItem } from "@home-assistant-react/ui/src";
import { HookFormNumberInput } from "@home-assistant-react/ui/src/form/NumberInput";
import { HookFormSelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import { HookFormTextInput } from "@home-assistant-react/ui/src/form/TextInput";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export type SidebarFormData = Pick<
  Sidebar,
  | "description"
  | "position"
  | "order"
  | "size"
  | "gridGapVertical"
  | "gridGapHorizontal"
>;

export interface SidebarFormProps {
  form: UseFormReturn<SidebarFormData>;
}

export const SidebarForm: React.FC<SidebarFormProps> = ({ form }) => {
  return (
    <>
      <HookFormSelectInput
        label={"Position"}
        form={form}
        name={"position"}
        isRequired
      >
        <SelectItem value={"left"}>Left</SelectItem>
        <SelectItem value={"right"}>Right</SelectItem>
        <SelectItem value={"top"}>Top</SelectItem>
        <SelectItem value={"bottom"}>Bottom</SelectItem>
      </HookFormSelectInput>
      <HookFormTextInput
        label={"Sidebar description"}
        form={form}
        name={"description"}
        isOptional
      />
      <HookFormNumberInput
        form={form}
        name={"order"}
        label={"Order"}
        min={0}
        max={999}
        isRequired
      />
      <HookFormNumberInput
        form={form}
        name={"size"}
        label={"Size"}
        min={0}
        max={999}
        isRequired
      />
      <HookFormNumberInput
        form={form}
        name={"gridGapVertical"}
        label={"Grid gap vertical"}
        min={0}
        max={999}
      />
      <HookFormNumberInput
        form={form}
        name={"gridGapHorizontal"}
        label={"Grid gap horizontal"}
        min={0}
        max={999}
      />
    </>
  );
};
