import { useHass } from "@home-assistant-react/api/src";
import { CustomImage } from "@home-assistant-react/types/src/ui/custom-images";
import React from "react";
import { Scrollbars, positionValues } from "react-custom-scrollbars";
import { Tabs, TabsList, TabsTrigger } from "../../disclosure";
import { ImagePickerImageButton } from "./ImagePickerImageButton";
import { ImageDirectories, ImagePickerProps } from "./ImagePicker.types";
import { Box, Grid } from "../../../primitives/common";
import {
  ImagePickerContext,
  ImagePickerProvider,
} from "./ImagePicker.provider";
import { DebouncedInput } from "../DebouncedInput";

const classes = {
  Tabs: "w-full h-full flex flex-col",
  TabsList: "py-2 rounded-none border-b bg-muted",
  ImagePickerSearchInputWrapper: "",
  ImagePickerSearchInput: "border-0 border-b shadow-none bg-muted rounded-none",
  ImagePickerWrapper: "h-[320px]",
  ImagePickerGrid: "gap-2 pl-2 py-4 grid-cols-1",
};

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onSelect,
  initialImageSet,
}) => {
  const hass = useHass();
  const scrollBarsRef = React.useRef<Scrollbars | null>(null);
  const handleImageSelect = (imageName: string, imageSet: string) => {
    onSelect?.({ image: imageName, set: imageSet });
  };

  const handleSearchValueChange = () => {
    scrollBarsRef.current?.scrollTop(0);
  };

  const imagePickerDictionaries: ImageDirectories = {
    custom: {
      images: Object.values(hass.customImages || {}),
      keys: Object.keys(hass.customImages || {}),
    },
  };

  return (
    <ImagePickerProvider
      dictionaries={imagePickerDictionaries}
      onSearchValueChange={handleSearchValueChange}
      initialImageSet={initialImageSet}
    >
      <ImagePickerContext.Consumer>
        {(state) => {
          if (!state) return null;

          const handleScrollChange = (values: positionValues) => {
            if (values.top >= 0.9 && state.page + 1 <= state.totalImagesPages) {
              state.setPage((page) => page + 1);
            }
          };

          return (
            <>
              <Tabs
                defaultValue="custom"
                value={state.imageSet}
                className={classes.Tabs}
                onValueChange={(value) => state.setImageSet(value as never)}
              >
                <TabsList className={classes.TabsList}>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
              </Tabs>
              <DebouncedInput
                className={classes.ImagePickerSearchInputWrapper}
                wrapperClassName={classes.ImagePickerSearchInput}
                onChangeValue={state.setSearchValue}
                placeholder={"Search images"}
                hideEmptyMessages
                isClearable
              />
              <Scrollbars
                ref={scrollBarsRef}
                className={classes.ImagePickerWrapper}
                onUpdate={handleScrollChange}
                style={{ height: undefined }}
              >
                <Grid className={classes.ImagePickerGrid}>
                  {state.availableImages
                    ? state.availableImages.map((imageId) => {
                        const customImage = hass.customImages?.[
                          imageId
                        ] as CustomImage;
                        return (
                          <Box key={imageId}>
                            <ImagePickerImageButton
                              onClick={handleImageSelect.bind(
                                null,
                                imageId,
                                state.imageSet,
                              )}
                              image={customImage}
                              imageSet={state.imageSet}
                            />
                          </Box>
                        );
                      })
                    : undefined}
                </Grid>
              </Scrollbars>
            </>
          );
        }}
      </ImagePickerContext.Consumer>
    </ImagePickerProvider>
  );
};
