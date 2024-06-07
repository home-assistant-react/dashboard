import { arrayLiteralIncludes } from "../../array";
import { ENTITY_OFF_STATES } from "@home-assistant-react/types/src";

export const isOffState = arrayLiteralIncludes(ENTITY_OFF_STATES);
