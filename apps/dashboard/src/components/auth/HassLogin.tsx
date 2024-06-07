import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import { HookFormTextInput } from "@home-assistant-react/ui/src/form/TextInput";
import { HookFormUrlInput } from "@home-assistant-react/ui/src/form/UrlInput";
import React from "react";
import { Span } from "@home-assistant-react/ui/src";
import { Box, Flex } from "@home-assistant-react/ui/src";
import { LS_HASS_URL_KEY } from "@home-assistant-react/types/src";
import { useForm } from "react-hook-form";
import { FullPageLoading } from "../FullPageLoading";
import { handleLogin, useWaitForSuccessLogin } from "./helpers";

const classes = {
  Wrapper: "items-center justify-center p-6 h-screen w-full",
  Login: "w-full max-w-md gap-6 flex-col",
  Logo: "w-full items-center gap-6",
  LogoImage: "w-[100px]",
  LogoText: "text-3xl text-primary",
  LogoTextSecondary: "text-2xl text-muted-foreground",
  Form: "w-full rounded shadow-md bg-primary-background p-4 flex-col",
};

export interface LoginFormData {
  hassUrl: string;
  token: string;
}

export const HassLogin: React.FC = () => {
  const { isLoading } = useWaitForSuccessLogin();
  const _hassUrl = window.localStorage.getItem(LS_HASS_URL_KEY) || "";

  const form = useForm<LoginFormData>({
    defaultValues: {
      hassUrl: _hassUrl,
      token: "",
    },
  });

  const handleLoginSubmit = form.handleSubmit(async (values) => {
    await handleLogin(values.token || "", values.hassUrl);
  });

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <Flex className={classes.Wrapper}>
      <Flex className={classes.Login}>
        <Flex className={classes.Logo}>
          <img
            className={classes.LogoImage}
            src={`${import.meta.env.BASE_URL}icons/icon.png`}
          />
          <Box className={classes.LogoText}>
            <Box>Home Assistant</Box>
            <Span className={classes.LogoTextSecondary}>React Dashboard</Span>
          </Box>
        </Flex>
        <FormWrapper onSubmit={handleLoginSubmit}>
          <Flex className={classes.Form}>
            <HookFormUrlInput
              form={form}
              name={"hassUrl"}
              label={"Home assistant URL"}
              isRequired
            />
            <HookFormTextInput
              form={form}
              name={"token"}
              label={"Long lived access token"}
              helperText={
                "Optional but recommended. If you have a long lived access token, you can paste it here"
              }
              isOptional
            />
            <Box>
              <FormSubmit>Login</FormSubmit>
            </Box>
          </Flex>
        </FormWrapper>
      </Flex>
    </Flex>
  );
};
