import { createContext } from "@home-assistant-react/hooks/src";
import { CoverPanelState } from "./types";

export const [PanelCoverProvider, usePanelCover] =
  createContext<CoverPanelState>({
    name: "PanelCoverProvider",
    hookName: "usePanelCover",
  });
