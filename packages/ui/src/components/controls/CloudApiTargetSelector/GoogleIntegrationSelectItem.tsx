import React from "react";
import { CloudIntegration } from "@home-assistant-react/types/src/api";
import { SelectItem } from "../select";
import { GoogleIntegrationLabel } from "./GoogleIntegrationLabel";

export const GoogleIntegrationSelectItem: React.FC<{
  integration: CloudIntegration;
}> = ({ integration }) => {
  return (
    <SelectItem value={`${integration.integration},${integration.auth_key}`}>
      <GoogleIntegrationLabel integration={integration} />
    </SelectItem>
  );
};
