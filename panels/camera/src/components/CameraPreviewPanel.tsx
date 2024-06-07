import { useHassGetEntitiesOnce } from "@home-assistant-react/api/src";
import { getRandomObjectValue } from "@home-assistant-react/helpers/src/objects/getRandomObjectValue";
import { useCameraEntity } from "@home-assistant-react/hooks/src/entities/useCameraEntity";
import { HassEntityState } from "@home-assistant-react/types/src";
import { CameraPanelProvider } from "./CameraPanelProvider";
import { VideoPreview } from "./VideoPreview";

export const CameraPreviewPanel = () => {
  const entities = useHassGetEntitiesOnce({ domain: "camera" });
  const randomEntity = entities
    ? getRandomObjectValue<HassEntityState<unknown>>(entities)
    : undefined;

  const cameraEntity = useCameraEntity(randomEntity?.entity_id || "");

  return (
    <CameraPanelProvider value={{ camera: cameraEntity }}>
      <VideoPreview />
    </CameraPanelProvider>
  );
};
