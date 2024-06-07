import { HassEntityBaseAttributes } from "@home-assistant-react/types/src";

export const isNumericFromAttributes = (attributes: HassEntityBaseAttributes) =>
  !!attributes.unit_of_measurement || !!attributes.state_class;
