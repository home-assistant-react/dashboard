import { PropertyControllerProps } from "@home-assistant-react/types/src";
import React from "react";

export interface PropertyControllerWrapperProps
  extends PropertyControllerProps<unknown> {
  help?: React.ReactNode;
}
