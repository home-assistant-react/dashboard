import { useCameraEntity } from "@home-assistant-react/hooks/src/entities/useCameraEntity";
import { PanelFC } from "@home-assistant-react/types/src";
import { CameraOptions } from "../defines/types";
import { CameraPanelProvider } from "./CameraPanelProvider";
import { EmptyCameraView } from "./EmptyCameraView";
import { VideoPreview } from "./VideoPreview";

export const Camera: PanelFC<CameraOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const cameraEntity = useCameraEntity(entityId);

  if (!cameraEntity) return <EmptyCameraView />;

  return (
    <CameraPanelProvider value={{ camera: cameraEntity }}>
      <VideoPreview />
    </CameraPanelProvider>
  );
};
