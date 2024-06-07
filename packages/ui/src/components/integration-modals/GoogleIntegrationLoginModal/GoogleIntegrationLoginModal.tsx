import React from "react";
import { TextInput } from "../../../form/TextInput";
import { GoogleIntegrationLoginModalProps } from "./GoogleIntegrationLoginModal.types";
import { IntegrationLoginModal } from "../../modals";

export const GoogleIntegrationLoginModal = React.forwardRef<
  HTMLDivElement,
  GoogleIntegrationLoginModalProps
>((props, ref) => {
  const clientIdRef = React.useRef<HTMLInputElement>(null);
  const clientSecretRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleOnStart = () => {
    setError("");
    const clientId = clientIdRef.current?.value;
    const clientSecret = clientSecretRef.current?.value;
    if (!clientId || !clientSecret) {
      setError("Please fill in all fields");
      return false;
    }

    return { client_id: clientId, client_secret: clientSecret };
  };

  React.useEffect(() => {
    if (clientIdRef.current) clientIdRef.current.value = "";

    if (clientSecretRef.current) clientSecretRef.current.value = "";
  }, [props.isOpen]);

  return (
    <IntegrationLoginModal
      integrationName={"google"}
      onStart={handleOnStart}
      title={"Login with google"}
      {...props}
      ref={ref}
    >
      <TextInput ref={clientIdRef} label={"Client Id"} />
      <TextInput error={error} ref={clientSecretRef} label={"Client Secret"} />
      {/*TODO add a guide link*/}
      <a href={"#"} style={{ textDecoration: "underline" }}>
        Guide on how to obtain Client Id and Client Secret
      </a>
    </IntegrationLoginModal>
  );
});

GoogleIntegrationLoginModal.displayName = "GoogleIntegrationLoginModal";
