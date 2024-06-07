import { ApiClient } from "@home-assistant-react/api/src/api";
import React from "react";
import {
  Dict,
  LS_HASS_AUTH_TOKEN_KEY,
  LS_HASS_TOKENS_KEY,
} from "../../types/src";
import { useBooleanValue } from "./use-boolean-value";

export const useGetAuthApiClient = () => {
  const isLoaded = useBooleanValue();
  const needAuth = useBooleanValue();
  const apiClientRef = React.useRef<ApiClient>();

  React.useEffect(() => {
    const accessToken =
      window.localStorage.getItem(LS_HASS_AUTH_TOKEN_KEY) ||
      window.localStorage.getItem(LS_HASS_TOKENS_KEY);

    if (accessToken) {
      const authData: Dict = JSON.parse(accessToken);

      if (!authData) return;
      apiClientRef.current = new ApiClient(authData);

      apiClientRef.current.getAuthToken().then(() => {
        isLoaded.setTrue();
      });

      return;
    }

    needAuth.setTrue();
  }, []);

  return {
    isLoaded: isLoaded.value,
    needAuth: needAuth.value,
    apiClientRef,
  };
};
