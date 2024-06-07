export interface IconValue {
  icon: string;
  set: string;
}

export interface IconDictionaryItem {
  icons: Record<string, string>;
  keys: string[];
}

export type IconDictionaries = Record<string, IconDictionaryItem>;
