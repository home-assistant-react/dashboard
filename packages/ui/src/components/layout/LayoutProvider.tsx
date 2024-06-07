import { useDisclosure } from "@home-assistant-react/hooks/src";
import { UseDisclosureReturn } from "@home-assistant-react/types/src";
import { SettingsDisclosureData } from "@home-assistant-react/types/src/settings/settings";
import React, { PropsWithChildren } from "react";

const availableThemes = ["light", "dark"] as const;

interface LayoutProviderState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  titleBarHeight: number;
  settingsDisclosure: UseDisclosureReturn<SettingsDisclosureData>;
}

export const LayoutContext = React.createContext<
  LayoutProviderState | undefined
>(undefined);

export interface LayoutProviderProps extends PropsWithChildren {}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const settingsDisclosure = useDisclosure<SettingsDisclosureData>();

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...availableThemes);
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  return (
    <LayoutContext.Provider
      value={{
        theme,
        setTheme,
        titleBarHeight: 32,
        settingsDisclosure,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export function useLayout() {
  const context = React.useContext(LayoutContext);

  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
}
