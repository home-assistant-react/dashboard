import {
  HassCoverEntityAttributes,
  PanelFC,
} from "@home-assistant-react/types/src";
import { CoverOptions } from "./types";
import { useHassGetEntity } from "@home-assistant-react/api/src";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import { PanelCoverProvider } from "./usePanelCover";
import { CoverOptionsModal } from "./CoverOptionsModal";
import { CoverCard } from "./CoverCard";

export const Cover: PanelFC<CoverOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const entity = useHassGetEntity<HassCoverEntityAttributes>(entityId);
  const moreModalDisclosure = useDisclosure();

  if (!entity) return <></>;

  return (
    <PanelCoverProvider
      value={{
        entityState: entity,
        state: entity.state,
        options,
        moreModalDisclosure,
      }}
    >
      <CoverCard panel={props.panel} />
      <CoverOptionsModal
        coverEntity={entity}
        isOpen={moreModalDisclosure.isOpen}
        onOpenChange={moreModalDisclosure.setOpen}
        panel={props.panel}
      />
    </PanelCoverProvider>
  );
};
