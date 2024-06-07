import {
  IconDictionaries,
  IconValue as TypeIconValue,
} from "@home-assistant-react/types/src/icons";
import React from "react";

export interface IconPickerProps {
  onSelect?: (icon: IconValue) => void;
  initialIconSet?: string;
}

export interface IconPickerIconButtonProps {
  icon: string;
  onClick: () => void;
  iconName: string;
  iconSet: string;
}

export interface IconPickerState {
  availableIcons: string[];
  page: number;
  totalIconsPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  iconSet: string;
  setIconSet: React.Dispatch<React.SetStateAction<string>>;
  dictionaries: IconDictionaries;
}

export type IconValue = TypeIconValue;
