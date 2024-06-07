import { UseCameraEntityReturn } from "@home-assistant-react/hooks/src/entities/useCameraEntity";

export interface CameraOptions {
  entity_id: string;
}

export interface CameraPanelState {
  camera: UseCameraEntityReturn | undefined;
}
