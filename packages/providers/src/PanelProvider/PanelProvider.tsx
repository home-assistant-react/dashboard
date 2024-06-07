import { PanelState } from "@home-assistant-react/types/src";
import { createContext } from "react";

export const PanelContext = createContext<PanelState | null>(null);
export const PanelProvider = PanelContext.Provider;
