import { useHassGetEntitiesOnce } from "@home-assistant-react/api/src";
import { getRandomObjectValue } from "@home-assistant-react/helpers/src/objects/getRandomObjectValue";
import {
  HassLightEntityAttributes,
  HassEntityState,
} from "@home-assistant-react/types/src";
import { LightPanel } from "../index";
import { LightPanelGrid } from "./panel/LightPanelGrid";
import { LightPanelProvider } from "./LightPanelProvider";

export const LightPreviewPanel = () => {
  const entities = useHassGetEntitiesOnce({ domain: "light" });
  const randomEntity = entities
    ? getRandomObjectValue<HassEntityState<HassLightEntityAttributes>>(entities)
    : undefined;

  if (!randomEntity) return null;

  return (
    <LightPanelProvider
      options={{
        entity_id: randomEntity.entity_id,
      }}
    >
      <LightPanelGrid
        showToggle={LightPanel.defaultOptions!.showToggle}
        showStatus={LightPanel.defaultOptions!.showStatus}
      />
    </LightPanelProvider>
  );
};
