import { useHassGetEntity } from "@home-assistant-react/api/src";
import { getDomainFromEntityId } from "@home-assistant-react/helpers/src/home-assistant";
import { PanelFC } from "@home-assistant-react/types/src";
import { ActionOptions } from "../defines/types";
import { ActionNoEntity } from "./ActionNoEntity";
import { ActionScript } from "./ActionScript";

export const Action: PanelFC<ActionOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const entity = useHassGetEntity(entityId);

  if (!entity) return <ActionNoEntity panel={props.panel} />;

  const domain = getDomainFromEntityId(entity.entity_id);

  if (domain === "script") {
    return <ActionScript panel={props.panel} />;
  }

  return null;
};
