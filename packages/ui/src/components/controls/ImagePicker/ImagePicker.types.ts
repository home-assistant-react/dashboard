import { CustomImage } from "@home-assistant-react/types/src/ui/custom-images";
import React from "react";

export interface ImageValue {
  image: string;
  set: string;
}

export interface ImagePickerProps {
  onSelect?: (image: ImageValue) => void;
  initialImageSet?: string;
}

export interface ImagePickerImageButtonProps {
  image: CustomImage;
  onClick: () => void;
  imageSet: string;
}

export interface ImageDictionaryItem {
  images: CustomImage[];
  keys: string[];
}

export type ImageDirectories = Record<string, ImageDictionaryItem>;

export interface ImagePickerState {
  availableImages: string[];
  page: number;
  totalImagesPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  imageSet: string;
  setImageSet: React.Dispatch<React.SetStateAction<string>>;
  dictionaries: ImageDirectories;
}
