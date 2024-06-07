import { ApiClient } from "@home-assistant-react/api/src/api";
import { PropsWithChildren } from "react";

export interface ApiProviderProps extends PropsWithChildren {
  apiClient?: ApiClient;
}
