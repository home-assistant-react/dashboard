import { DEFAULT_DOMAIN_ICON } from "../defines";
import { HassEntityState } from "@home-assistant-react/types/src";
import { getDomainFromEntityId } from "@home-assistant-react/helpers/src/home-assistant";
import { getDomainIcon } from "./getDomainIcon";

export const getStateIconPath = (state?: HassEntityState) => {
  if (!state) {
    return DEFAULT_DOMAIN_ICON;
  }
  return getDomainIcon(getDomainFromEntityId(state.entity_id), state);
};
