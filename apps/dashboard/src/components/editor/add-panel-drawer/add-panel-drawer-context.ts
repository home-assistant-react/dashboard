import { createContext } from "@home-assistant-react/hooks/src";

export interface AddPanelDrawerState {
  allowDrag?: boolean;
  isDragging: boolean;
  startDragging: () => void;
  endDragging: (forceClose?: boolean) => void;
  openEditorWhenAdded?: boolean;
}

export const [AddPanelDrawerContext, useAddPanelDrawerContext] =
  createContext<AddPanelDrawerState>({
    providerName: "AddPanelDrawerContext",
    hookName: "useAddPanelDrawerContext",
  });
