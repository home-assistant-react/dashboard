export interface CloudApiTargetSelectorProps {
  allowedTypes?: string[];
  onChange?: (integrationName: string, auth_key: string) => void;
  valueIntegration?: string;
  valueAuthKey?: string;
}
