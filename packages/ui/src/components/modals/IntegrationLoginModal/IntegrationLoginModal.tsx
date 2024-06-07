import React from "react";
import { Modal } from "../Modal/Modal";
import { IntegrationLoginModalProps } from "./IntegrationLoginModal.types";
import { useToastError } from "../../overlay";
import { Button } from "../../buttons";
import { Box, Flex } from "../../../primitives/common";
import { useApi, useHandleApiRequest } from "@home-assistant-react/api/src";
import { Dict } from "@home-assistant-react/types/src";
import { openPopup } from "@home-assistant-react/helpers/src";
import { Spinner } from "../../feedback/Spinner";

export const IntegrationLoginModal = React.forwardRef<
  HTMLDivElement,
  IntegrationLoginModalProps
>((props, ref) => {
  const { integrationName, onSuccess, onStart, children, ...rest } = props;

  const api = useApi();
  const toastError = useToastError();
  const popupRef = React.useRef<Window | null>(null);

  const [loginUrl, setLoginUrl] = React.useState<string | null>(null);
  const [authId, setAuthId] = React.useState<string | null>("");

  const { isLoading, wrapApiRequest } = useHandleApiRequest();

  const getLoginUrl = wrapApiRequest(
    async (integrationName: string, data: Dict) => {
      const result = await api.startIntegrationLogin(integrationName, data);
      console.log("START RESYULT", result);
      // eslint-disable-next-line no-console
      if (!result.started) {
        toastError("Error starting login process");
        return;
      }

      setLoginUrl(result.login_uri);
      setAuthId(result.authData.authId);
      popupRef.current = openPopup(result.login_uri);
    },
  );

  const handleOnStart = async () => {
    const result = onStart();
    if (result) {
      await getLoginUrl(integrationName, result);
    }
  };

  const handleCancelProcess = async () => {
    if (authId) await api.cancelIntegrationAuth(integrationName, authId);
    setLoginUrl(null);
    setAuthId(null);
  };

  React.useEffect(() => {
    if (loginUrl) {
      // ad onmessage listener
      // if message contains token, close popup and call onSuccess

      const handleOnMessage = (event: MessageEvent) => {
        // TODO: enable it after dev
        //if (event.origin !== window.location.origin) return;
        if (event.data.auth_key) {
          // Disable due would not work for CORS
          //popupRef.current?.close();
          onSuccess?.(event.data.auth_key);
        }
      };

      window.addEventListener("message", handleOnMessage);

      return () => {
        window.removeEventListener("message", handleOnMessage);
      };
    }

    return;
  }, [loginUrl]);

  React.useEffect(() => {
    setLoginUrl(null);
  }, [props.isOpen]);

  return (
    <Modal ref={ref} {...rest}>
      <Flex style={{ flexDirection: "column", gap: "24px" }}>
        {!loginUrl && (
          <>
            {children}
            <Button isLoading={isLoading} onClick={handleOnStart}>
              Start login process
            </Button>
          </>
        )}
        {loginUrl && (
          <>
            <Box style={{ textAlign: "center" }}>
              Complete the login process in the popup
            </Box>
            <Spinner isIndeterminate />
            <Button onClick={handleCancelProcess}>Cancel</Button>
          </>
        )}
      </Flex>
    </Modal>
  );
});

IntegrationLoginModal.displayName = "IntegrationLoginModal";
