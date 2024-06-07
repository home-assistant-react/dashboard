import React from "react";
import { ApiClient } from "../../api";
import { getRegisteredContext } from "../../dashboard/helpers/getRegisteredContext";
import { ApiState } from "@home-assistant-react/types/src";

export const useApi = (): ApiClient => {
  const context = React.useContext(getRegisteredContext<ApiState>("api"));
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }

  return context.apiClient!;
};
