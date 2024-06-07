import { ImageDirectories, ImagePickerState } from "./ImagePicker.types";
import React, { PropsWithChildren } from "react";

export const ImagePickerContext = React.createContext<
  ImagePickerState | undefined
>(undefined);

const ICONS_PER_PAGE = 50 as const;

export const ImagePickerProvider: React.FC<
  PropsWithChildren<{
    onSearchValueChange?: (value: string) => void;
    dictionaries: ImageDirectories;
    initialImageSet?: string;
  }>
> = ({ children, onSearchValueChange, initialImageSet, dictionaries }) => {
  const [page, setPage] = React.useState(1);
  const [availableImages, setAvailableImages] = React.useState<string[]>([]);
  const [totalImages, setTotalImages] = React.useState(0);
  const [imageSet, setImageSet] = React.useState<string>(
    initialImageSet || "custom",
  );

  const totalImagesPages = Math.ceil(totalImages / ICONS_PER_PAGE);
  const [searchValue, setSearchValue] = React.useState("");
  const totalImagesToShown = ICONS_PER_PAGE * page;

  React.useEffect(() => {
    let filteredImages = dictionaries[imageSet].keys;

    if (searchValue) {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      filteredImages = filteredImages.filter((imageId) => {
        return String(
          dictionaries[imageSet].images
            .find((image) => image.id === imageId)
            ?.image_name?.toLowerCase(),
        ).includes(lowerCaseSearchValue);
      });
    }

    setTotalImages(filteredImages.length);
    setAvailableImages(filteredImages.slice(0, totalImagesToShown));
  }, [totalImagesToShown, searchValue, imageSet]);

  React.useEffect(() => {
    setPage(1);
    onSearchValueChange?.(searchValue);
  }, [searchValue]);

  return (
    <ImagePickerContext.Provider
      value={{
        availableImages,
        page,
        totalImagesPages,
        setPage,
        searchValue,
        setSearchValue,
        imageSet,
        setImageSet: (imageSet) => {
          setPage(1);
          setAvailableImages([]);
          setTotalImages(0);
          setImageSet(imageSet);
        },
        dictionaries,
      }}
    >
      {children}
    </ImagePickerContext.Provider>
  );
};
