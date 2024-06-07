import { CoverCard } from "./CoverCard";
import { useHassGetEntitiesOnce } from "@home-assistant-react/api/src";
import { getRandomObjectValue } from "@home-assistant-react/helpers/src/objects/getRandomObjectValue";
import {
  HassCoverEntityAttributes,
  HassEntityState,
} from "@home-assistant-react/types/src";
import { PanelCoverProvider } from "./usePanelCover";

export const CoverPreviewPanel = () => {
  const entities = useHassGetEntitiesOnce({ domain: "cover" });
  const randomEntity = entities
    ? getRandomObjectValue<HassEntityState<HassCoverEntityAttributes>>(entities)
    : undefined;

  if (!randomEntity) return null;

  return (
    <PanelCoverProvider
      value={{
        entityState: randomEntity,
        state: randomEntity.state,
        options: { entity_id: "" },
      }}
    >
      <CoverCard panel={{ id: "", component: "" }} />
    </PanelCoverProvider>
  );
};
