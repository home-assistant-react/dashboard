import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import React from "react";
import { Button } from "../../primitives/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../overlay";
import { cloudApiIntegrationComponents } from "./cloud-api-integrations";

export interface CloudApiAddIntegrationButtonProps {
  onSuccess: (integration: string, value: string) => void;
}

export const CloudApiAddIntegrationButton: React.FC<
  CloudApiAddIntegrationButtonProps
> = ({ onSuccess }) => {
  const [targetLoginModal, setTargetLoginModal] = React.useState("");
  const loginModalDisclosure = useDisclosure();

  const Components =
    targetLoginModal && targetLoginModal in cloudApiIntegrationComponents
      ? cloudApiIntegrationComponents[
          targetLoginModal as keyof typeof cloudApiIntegrationComponents
        ]
      : undefined;

  const handleOnSuccess = (value: string) => {
    onSuccess(targetLoginModal, value);
    loginModalDisclosure.close();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            icon={"Plus"}
            variant={"outline"}
            style={{ whiteSpace: "nowrap" }}
          >
            Add integration
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"left"}>
          <DropdownMenuGroup>
            {getObjectKeys(cloudApiIntegrationComponents).map((integration) => (
              <DropdownMenuItem
                key={integration}
                onSelect={() => {
                  setTargetLoginModal(integration);
                  loginModalDisclosure.open();
                }}
              >
                {
                  cloudApiIntegrationComponents[
                    integration as keyof typeof cloudApiIntegrationComponents
                  ].name
                }
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {Components?.loginModal && (
        <Components.loginModal
          onSuccess={handleOnSuccess}
          onOpenChange={loginModalDisclosure.setOpen}
          isOpen={loginModalDisclosure.isOpen}
        />
      )}
    </>
  );
};
