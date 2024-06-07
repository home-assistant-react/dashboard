import { useDashboard } from "@home-assistant-react/api/src";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import {
  DashboardSettings,
  defaultDashboardOptions,
} from "@home-assistant-react/types/src";
import { Box, Flex, SelectItem } from "@home-assistant-react/ui/src";
import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import { HookFormSelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import React from "react";
import { useForm } from "react-hook-form";

export const GeneralSettings: React.FC = () => {
  const { settings, updateSettings } = useDashboard();
  const { wrapApiRequest, isLoading } = useStandardApiHandler();
  const form = useForm<DashboardSettings>({
    defaultValues: {
      ...defaultDashboardOptions,
      ...settings,
    },
  });

  const handleSubmit = form.handleSubmit(
    wrapApiRequest(async (values) => {
      updateSettings(values);
    }, "Settings updated"),
  );

  return (
    <FormWrapper onSubmit={handleSubmit} isLoading={isLoading}>
      <Flex className={"gap-10 flex-col px-10"}>
        <Flex className={"gap-6"}>
          <HookFormSelectInput
            label={"Show views selector"}
            form={form}
            name={"showViewSelector"}
          >
            <SelectItem value={"auto"}>Auto</SelectItem>
            <SelectItem value={"always"}>Always</SelectItem>
            <SelectItem value={"never"}>Never</SelectItem>
          </HookFormSelectInput>
          <HookFormSelectInput
            label={"View selector position"}
            form={form}
            name={"viewSelectorPosition"}
          >
            <SelectItem value={"top"}>Top</SelectItem>
            <SelectItem value={"bottom"}>Bottom</SelectItem>
            <SelectItem value={"left"}>Left</SelectItem>
            <SelectItem value={"right"}>Right</SelectItem>
          </HookFormSelectInput>
        </Flex>
        <Box>
          <FormSubmit>Save</FormSubmit>
        </Box>
      </Flex>
    </FormWrapper>
  );
};
