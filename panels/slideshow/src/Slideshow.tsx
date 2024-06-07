import { defaultGroupOptions, PanelFC } from "@home-assistant-react/types/src";
import React from "react";
import { Photo } from "@home-assistant-react/types/src/api";
import { useApi } from "@home-assistant-react/api/src";
import { logError } from "@home-assistant-react/helpers/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { AuthenticatedImage, Flex } from "@home-assistant-react/ui/src";
import { Spinner } from "@home-assistant-react/ui/src/components/feedback/Spinner";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideshowOptions } from "./types";

const classes = {
  NoAlbums: "w-full h-full items-center justify-center",
  Loading: "w-full h-full items-center justify-center",
};

export const Slideshow: PanelFC<SlideshowOptions> = ({ panel }) => {
  const options = panel.options;
  const [images, setImages] = React.useState<Photo[]>([]);
  const api = useApi();

  const albums =
    options?.albums?.filter(
      (album) => album.integration && album.auth_key && album.album_id,
    ) || [];

  const loadPhotos = React.useCallback(() => {
    setImages([]);
    if (albums.length > 0) {
      api
        .getRandomPhotos(albums, options?.maxItems)
        .then((result) => {
          setImages(result.photos);
        })
        .catch((e) => {
          logError(e);
        });
    }
  }, [sanitizeDep(albums), options?.maxItems]);

  React.useEffect(() => {
    loadPhotos();
    const interval = setInterval(
      loadPhotos,
      (options?.refreshMinutes || 60) * 1000 * 60,
    );
    return () => clearInterval(interval);
  }, [loadPhotos, options?.refreshMinutes]);

  if (!albums.length)
    return <Flex className={classes.NoAlbums}>No album selected</Flex>;

  if (!images.length)
    return (
      <Flex className={classes.Loading}>
        <Spinner isIndeterminate />
      </Flex>
    );

  const autoplayEnabled = options?.autoplayEnabled !== false;
  const showPagination = options?.showPagination !== false;
  const showNavigation = options?.showNavigation === true;
  const modules = [A11y];

  if (autoplayEnabled) modules.push(Autoplay);
  if (showPagination) modules.push(Pagination);
  if (showNavigation) modules.push(Navigation);

  return (
    <Swiper
      spaceBetween={0}
      modules={modules}
      style={{ position: "absolute", inset: 0 }}
      autoplay={
        autoplayEnabled
          ? {
              delay: (options?.autoplayDelay || 30) * 1000,
              disableOnInteraction: false,
            }
          : undefined
      }
      pagination={{ clickable: true }}
      slidesPerView={
        options?.itemsPerSlide || defaultGroupOptions.slidesPerView
      }
      slidesPerGroup={options?.itemsPerGroup || undefined}
      navigation={
        showNavigation
          ? {
              enabled: true,
            }
          : undefined
      }
      loop
    >
      {images.map((image, imageIndex) => {
        const isPortrait = Number(image.height) > Number(image.width);
        return (
          <SwiperSlide
            style={{ height: "100%", display: "flex", overflow: "hidden" }}
            key={`${imageIndex}`}
          >
            <AuthenticatedImage
              backdropBackground={isPortrait}
              style={{ width: "100%" }}
              integrationName={image.integration}
              authKey={image.auth_key}
              photoId={image.id}
              imgProps={{
                style: {
                  width: isPortrait ? undefined : "100%",
                  height: "100%",
                },
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
