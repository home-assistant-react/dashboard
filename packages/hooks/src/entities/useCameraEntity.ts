import {
  useApi,
  useHassGetEntity,
  UseHassGetEntityReturn,
} from "@home-assistant-react/api/src";
import { HassCameraEntityAttributes } from "@home-assistant-react/types/src";

export interface UseCameraEntityReturn
  extends UseHassGetEntityReturn<HassCameraEntityAttributes> {
  getPreviewStreamUrl: (width?: number, height?: number) => string;
}

export const useCameraEntity = <T extends HassCameraEntityAttributes>(
  entityId: string,
): UseCameraEntityReturn | undefined => {
  const api = useApi();
  const cameraEntity = useHassGetEntity<T>(entityId);
  if (!cameraEntity) return undefined;
  return {
    ...cameraEntity,
    getPreviewStreamUrl: (width = 800, height = 600) => {
      const entityPicture = cameraEntity?.attributes?.entity_picture;
      if (!entityPicture) return "";
      return `${api.getHassBaseUrl()}${entityPicture}${width && `&width=${parseInt(String(width))}`}${height && `&height=${parseInt(String(height))}`}`;
    },
  };
};
