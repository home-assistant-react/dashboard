import { arrayLiteralIncludes } from "../../array";
import { ENTITY_UNAVAILABLE_STATES } from "@home-assistant-react/types/src";

export const isUnavailableState = arrayLiteralIncludes(
  ENTITY_UNAVAILABLE_STATES,
);
