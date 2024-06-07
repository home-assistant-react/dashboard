import { HassEntityState } from "@home-assistant-react/types/src";
import { getDomainIconWithoutDefault } from "./getDomainIconWithoutDefault";
import { DEFAULT_DOMAIN_ICON } from "../defines";

export const getDomainIcon = (
  domain: string,
  stateObj?: HassEntityState,
  state?: string,
) => {
  const icon = getDomainIconWithoutDefault(domain, stateObj, state);
  if (icon) {
    return icon;
  }
  return DEFAULT_DOMAIN_ICON;
};
