import { createContext } from "@home-assistant-react/hooks/src";
import { CameraPanelState } from "../defines/types";

export const [CameraPanelProvider, useCameraPanel] =
  createContext<CameraPanelState>({
    name: "CameraPanelProvider",
    hookName: "useCameraPanel",
  });
