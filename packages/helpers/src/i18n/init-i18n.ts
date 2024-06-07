import { Dict } from "@home-assistant-react/types/src";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export type AvailableLanguages = "en" | "it";
export type Translations<T extends string = ""> = Record<
  AvailableLanguages | (T extends "" ? AvailableLanguages : T),
  Dict
>;

export const defaultTranslationNamespace = "common" as const;

export async function initI18n<AvailableLanguage extends string>(
  availableLanguages: AvailableLanguage[],
  appTranslations: Translations<(typeof availableLanguages)[number]>,
) {
  return await i18next.use(initReactI18next).init({
    lng: "en", // TODO get from user settings
    debug: true,
    resources: appTranslations,
    defaultNS: defaultTranslationNamespace,
  });
}
