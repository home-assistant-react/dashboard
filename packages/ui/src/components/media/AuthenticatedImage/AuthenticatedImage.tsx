import React from "react";
import { AuthenticatedImageProps } from "./AuthenticatedImage.types";
import { useApi } from "@home-assistant-react/api/src";
import { logError } from "@home-assistant-react/helpers/src";
import { Box } from "../../../primitives/common";
import { cn } from "../../../helpers";
import { Spinner } from "../../feedback/Spinner";

const imageCache: Map<string, string> = new Map();

const classes = {
  Wrapper: "bg-primary-background items-center justify-center inline-flex",
  Backdrop: "backdrop-blur-sm bg-black absolute inset-[-40px]",
  BackdropImage: "blur-md object-cover relative",
  Image: "object-cover relative",
};

export const AuthenticatedImage = React.forwardRef<
  HTMLImageElement,
  AuthenticatedImageProps
>((props, ref) => {
  const {
    src,
    photoId,
    w,
    h,
    authKey,
    integrationName,
    placeholder,
    className,
    allowCache = false,
    imgProps,
    backdropBackground,
    ...rest
  } = props;
  const api = useApi();
  const [loadedImage, setLoadedImage] = React.useState<string | null>(null);

  const imageUrl =
    src || (photoId && authKey && integrationName)
      ? api.getUrl(
          "/photos/photo",
          {
            photo_id: photoId,
            auth_key: authKey,
            w,
            h,
          },
          integrationName,
        )
      : undefined;

  React.useEffect(() => {
    if (!imageUrl) return;

    // Check cache first
    if (allowCache && imageCache.has(imageUrl)) {
      setLoadedImage(imageCache.get(imageUrl) || null);
      return;
    }

    api
      .getPhotoByUrl(imageUrl)
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setLoadedImage(objectURL);

        // Save to cache
        if (allowCache) imageCache.set(imageUrl, objectURL);
      })
      .catch((error) => {
        logError("Error fetching authorized image:", error);
      });
  }, [imageUrl]);

  return (
    <Box
      style={{ width: w, height: h }}
      as={"span"}
      className={cn(classes.Wrapper, className)}
      {...rest}
    >
      {backdropBackground && (
        <Box className={classes.Backdrop}>
          {!!loadedImage && (
            <img
              alt={imgProps?.alt}
              style={{ width: "100%", height: "100%" }}
              ref={ref}
              src={loadedImage || placeholder}
              className={classes.BackdropImage}
            />
          )}
        </Box>
      )}
      {loadedImage ? (
        <img
          alt={imgProps?.alt}
          {...imgProps}
          ref={ref}
          src={loadedImage || placeholder}
          className={classes.Image}
        />
      ) : (
        <Spinner isIndeterminate />
      )}
    </Box>
  );
});

AuthenticatedImage.displayName = "AuthenticatedImage";
