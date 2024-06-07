import { IntegrationLoginModalProps } from "../../modals";

export interface GoogleIntegrationLoginModalProps
  extends Omit<
    IntegrationLoginModalProps,
    "onStart" | "onSuccess" | "integrationName"
  > {
  onSuccess?: (authKey: string) => void;
}
