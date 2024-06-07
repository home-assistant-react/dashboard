import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { useGetPanelDomSize } from "@home-assistant-react/hooks/src/useGetPanelDomSize";
import { Flex } from "@home-assistant-react/ui/src";
import { Spinner } from "@home-assistant-react/ui/src/components/feedback/Spinner";
import React from "react";
import { useCameraPanel } from "./CameraPanelProvider";
import { EmptyCameraView } from "./EmptyCameraView";

export const VideoPreview: React.FC = () => {
  const isLoading = useBooleanValue(true);
  const { camera } = useCameraPanel();
  const { panelRect } = useGetPanelDomSize();

  if (!camera) return <EmptyCameraView />;

  const entityPicture = camera?.attributes?.entity_picture;
  if (!entityPicture) return <EmptyCameraView />;

  return (
    <Flex className={"w-full h-full items-center justify-center relative"}>
      {isLoading.value && (
        <Flex className={"absolute inset-0 items-center justify-center"}>
          <Spinner />
        </Flex>
      )}
      <img
        className={" w-full h-full relative"}
        src={camera.getPreviewStreamUrl(panelRect?.width, panelRect?.height)}
        onLoad={() => isLoading.setFalse()}
      />
    </Flex>
  );
};
