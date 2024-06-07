import React from "react";
import { SelectInput } from "../../../form/SelectInput";
import { cloudApiIntegrationComponents } from "../cloud-api-integrations";
import { CloudApiAddIntegrationButton } from "../CloudApiAddIntegrationButton";
import { CloudApiTargetSelectorProps } from "./CloudApiTargetSelector.types";
import { Flex } from "../../../primitives/common";
import { useDashboard } from "@home-assistant-react/api/src";

const classes = {
  Wrapper: "w-full items-end gap-6",
};

export const CloudApiTargetSelector = React.forwardRef<
  HTMLDivElement,
  CloudApiTargetSelectorProps
>(({ onChange, valueIntegration, valueAuthKey }, ref) => {
  const { integrations, refreshIntegrations } = useDashboard();

  const [selectedIntegration, setSelectedIntegration] = React.useState("");

  const handleOnSuccess = (integration: string, value: string) => {
    refreshIntegrations().then(() => {
      setSelectedIntegration(`${integration}-${value}`);
    });
  };

  const handleOnIntegrationChange = (integrationValue: string) => {
    const [integration, auth_key] = integrationValue.split(",");
    onChange?.(integration, auth_key);
    setSelectedIntegration(integrationValue);
  };

  const value =
    valueIntegration !== undefined && valueAuthKey !== undefined
      ? `${valueIntegration},${valueAuthKey}`
      : selectedIntegration;

  return (
    <Flex className={classes.Wrapper} ref={ref}>
      <SelectInput
        label={"Integration"}
        onChangeValue={handleOnIntegrationChange}
        hideEmptyMessages
        value={value}
      >
        {(integrations || []).map((integration) => {
          const SelectItem =
            integration.integration in cloudApiIntegrationComponents
              ? cloudApiIntegrationComponents[
                  integration.integration as keyof typeof cloudApiIntegrationComponents
                ]
              : undefined;
          if (!SelectItem) return null;

          return (
            <SelectItem.selectItem
              key={integration.auth_key}
              integration={integration}
            />
          );
        })}
      </SelectInput>
      <CloudApiAddIntegrationButton onSuccess={handleOnSuccess} />
    </Flex>
  );
});

CloudApiTargetSelector.displayName = "CloudApiTargetSelector";
