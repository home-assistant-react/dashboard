import { useApi } from "@home-assistant-react/api/src";
import { CustomImage } from "../../types/src/ui/custom-images";

export const useGetCustomImageThumbnailUrl = () => {
  const api = useApi();
  return (customImage: CustomImage) =>
    api.getUrl(
      "/custom-images/" +
        customImage.id +
        "/thumbnail/" +
        customImage.image_name,
    );
};
