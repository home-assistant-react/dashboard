import { IconDictionaries } from "@home-assistant-react/types/src/icons";
import mdiTransformedIconNames from "../defines/mdiTransformedIconNames.json";
import iconDictionaries from "../icon-dictionaries.json";

export const mdiDictionary: Record<
  string,
  { lowerCase?: string; capitalized: string }
> = mdiTransformedIconNames;

export const iconDictionaries: IconDictionaries = iconDictionaries;
