import { useHass } from "@home-assistant-react/api/src";
import { useGetCustomImageThumbnailUrl } from "./useGetCustomImageThumbnailUrl";

export const useGetCustomImageThumbnailUrlById = () => {
  const getCustomImageThumbnailUrl = useGetCustomImageThumbnailUrl();
  const hass = useHass();
  return (customImageId: string) => {
    const customImage = hass.customImages?.[customImageId];
    if (!customImage) return "";
    return getCustomImageThumbnailUrl(customImage);
  };
};
