import { PropsWithChildren } from "react";
import { PropertyControllerState } from "@home-assistant-react/types/src";

export interface PropertyControllerProviderProps extends PropsWithChildren {
  value: PropertyControllerState;
}
