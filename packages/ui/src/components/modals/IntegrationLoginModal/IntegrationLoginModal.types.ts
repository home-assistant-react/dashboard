import { Dict } from "@home-assistant-react/types/src";
import { ModalProps } from "../Modal";

export interface IntegrationLoginModalProps extends ModalProps {
  onStart: () => Dict | false;
  onSuccess?: (authKey: string) => void;
  integrationName: string;
}
