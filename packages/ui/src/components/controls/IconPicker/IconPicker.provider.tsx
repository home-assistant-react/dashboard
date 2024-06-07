import { IconDictionaries, IconPickerState } from "./IconPicker.types";
import React, { PropsWithChildren } from "react";

export const IconPickerContext = React.createContext<
  IconPickerState | undefined
>(undefined);

const ICONS_PER_PAGE = 50 as const;

export const IconPickerProvider: React.FC<
  PropsWithChildren<{
    onSearchValueChange?: (value: string) => void;
    dictionaries: IconDictionaries;
    initialIconSet?: string;
  }>
> = ({ children, onSearchValueChange, initialIconSet, dictionaries }) => {
  const [page, setPage] = React.useState(1);
  const [availableIcons, setAvailableIcons] = React.useState<string[]>([]);
  const [totalIcons, setTotalIcons] = React.useState(0);
  const [iconSet, setIconSet] = React.useState<string>(initialIconSet || "mdi");

  const totalIconsPages = Math.ceil(totalIcons / ICONS_PER_PAGE);
  const [searchValue, setSearchValue] = React.useState("");
  const totalIconsToShown = ICONS_PER_PAGE * page;

  React.useEffect(() => {
    let filteredIcons = dictionaries[iconSet].keys;

    if (searchValue) {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      filteredIcons = filteredIcons.filter((iconName) =>
        String(dictionaries[iconSet].icons[iconName])
          .toLowerCase()
          .includes(lowerCaseSearchValue),
      );
    }

    setTotalIcons(filteredIcons.length);
    setAvailableIcons(filteredIcons.slice(0, totalIconsToShown));
  }, [totalIconsToShown, searchValue, iconSet]);

  React.useEffect(() => {
    setPage(1);
    onSearchValueChange?.(searchValue);
  }, [searchValue]);

  return (
    <IconPickerContext.Provider
      value={{
        availableIcons,
        page,
        totalIconsPages,
        setPage,
        searchValue,
        setSearchValue,
        iconSet,
        setIconSet: (iconSet) => {
          setPage(1);
          setAvailableIcons([]);
          setTotalIcons(0);
          setIconSet(iconSet);
        },
        dictionaries,
      }}
    >
      {children}
    </IconPickerContext.Provider>
  );
};
