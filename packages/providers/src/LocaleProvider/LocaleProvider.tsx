import React from "react";
import { LocaleProviderProps } from "./LocaleProvider.types";
import { useHass } from "@home-assistant-react/api/src";
import { IntlProvider } from "react-intl";
import { LocaleState } from "@home-assistant-react/types/src";
import en from "@home-assistant-react/locale/src/en.json";

export const LocaleContext = React.createContext<LocaleState | null>(null);

export const LocaleProvider: React.FC<
  React.PropsWithChildren<LocaleProviderProps>
> = ({ children }) => {
  const { locale } = useHass();
  const [messages] = React.useState<Record<string, string>>({
    ...locale,
    ...en,
  });

  return (
    <IntlProvider defaultLocale={"en"} locale={"it"} messages={messages}>
      <LocaleContext.Provider value={{ messages: {} }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
};

LocaleProvider.displayName = "LocaleProvider";
