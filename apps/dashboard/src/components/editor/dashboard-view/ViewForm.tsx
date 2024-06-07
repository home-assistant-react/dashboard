import { DashboardView } from "@home-assistant-react/types/src";
import { Flex } from "@home-assistant-react/ui/src";
import { HookFormNumberInput } from "@home-assistant-react/ui/src/form/NumberInput";
import { HookFormTextInput } from "@home-assistant-react/ui/src/form/TextInput";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export type ViewFormData = Pick<
  DashboardView,
  | "name"
  | "order"
  | "gridGapHorizontal"
  | "gridGapVertical"
  | "gridPaddingHorizontal"
  | "gridPaddingVertical"
>;

export interface ViewFormProps {
  form: UseFormReturn<ViewFormData>;
}

export const ViewForm: React.FC<ViewFormProps> = ({ form }) => {
  return (
    <>
      <HookFormTextInput
        label={"View label"}
        form={form}
        name={"name"}
        isRequired
      />
      <Flex className={"gap-6"}>
        <HookFormNumberInput
          form={form}
          name={"gridGapHorizontal"}
          label={"Grid gap horizontal"}
          placeholder={"14"}
        />
        <HookFormNumberInput
          form={form}
          name={"gridGapVertical"}
          label={"Grid gap vertical"}
          placeholder={"10"}
        />
      </Flex>
      <Flex className={"gap-6"}>
        <HookFormNumberInput
          form={form}
          name={"gridPaddingHorizontal"}
          label={"Grid padding horizontal"}
          placeholder={"10"}
        />
        <HookFormNumberInput
          form={form}
          name={"gridPaddingVertical"}
          label={"Grid padding vertical"}
          placeholder={"10"}
        />
      </Flex>
    </>
  );
};
