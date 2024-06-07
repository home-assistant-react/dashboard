import React from "react";
import { Button, Flex, Box } from "@home-assistant-react/ui/src";
import { LS_HASS_AUTH_TOKEN_KEY } from "@home-assistant-react/types/src";

const classes = {
  AuthErrorWrapper: "items-center justify-center gap-6 flex-cl h-screen w-full",
};

export const AuthError: React.FC = () => {
  const handleLogout = () => {
    window.localStorage.setItem(LS_HASS_AUTH_TOKEN_KEY, "");
    window.location.reload();
  };

  return (
    <Flex className={classes.AuthErrorWrapper}>
      <Box>Something went wrong with the authentication.</Box>
      <Box>
        <Button onClick={handleLogout}>Go to login</Button>
      </Box>
    </Flex>
  );
};
