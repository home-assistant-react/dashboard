import { createContext } from "@home-assistant-react/hooks/src";
import { UseDisclosureReturn } from "@home-assistant-react/types/src";
import { SettingSectionId } from "@home-assistant-react/types/src/settings/setting-sections";
import { SettingsDisclosureData } from "@home-assistant-react/types/src/settings/settings";

export interface SettingsDrawerState {
  settingsDisclosure: UseDisclosureReturn<SettingsDisclosureData>;
  selectedSection: SettingSectionId;
}

export const [SettingsDrawerProvider, useSettingsDrawerContext] =
  createContext<SettingsDrawerState>({
    providerName: "SettingsDrawerContext",
    hookName: "useSettingsDrawerContext",
  });
