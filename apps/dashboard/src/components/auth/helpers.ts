import {
  LS_HASS_AUTH_TOKEN_KEY,
  LS_HASS_URL_KEY,
} from "@home-assistant-react/types/src";
import { getAuth } from "home-assistant-js-websocket";
import React from "react";

export const handleLogin = async (token: string, hassUrl: string) => {
  window.localStorage.setItem(LS_HASS_URL_KEY, hassUrl);

  if (token) {
    window.localStorage.setItem(
      LS_HASS_AUTH_TOKEN_KEY,
      JSON.stringify({
        access_token: token,
        client_id: `${window.location.protocol}//${window.location.host}/`,
        expires_in: -1,
        expires: -1,
        ha_auth_provider: "dashboard",
        token_type: "Bearer",
        refresh_token: undefined,
        hassUrl,
      }),
    );
    window.location.reload();
    return;
  }

  await getAuth({
    hassUrl,
  });
};

export const useWaitForSuccessLogin = () => {
  const queryParams = new URLSearchParams(window.location?.search || "");
  const auth_callback = queryParams.get("auth_callback");
  const code = queryParams.get("code");
  const state = queryParams.get("state");
  const hassUrl = window.localStorage.getItem(LS_HASS_URL_KEY) || "";

  React.useEffect(() => {
    if (!auth_callback || !code || !state || !hassUrl) return;
    getAuth({
      hassUrl,
      saveTokens: (tokens) => {
        window.localStorage.setItem(
          LS_HASS_AUTH_TOKEN_KEY,
          JSON.stringify(tokens),
        );

        window.location.href = window.location.href.split("?")[0];
      },
    });
  }, [auth_callback, code, state, hassUrl]);

  return {
    isLoading: !!auth_callback && !!code && !!state && !!hassUrl,
  };
};
