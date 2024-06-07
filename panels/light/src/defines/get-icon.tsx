import { PanelFC } from "@home-assistant-react/types/src";
import { GoLightBulb, HiLightBulb } from "@home-assistant-react/icons/src";

export const lightPanelGetIcon: PanelFC["getIcon"] = (state, options) =>
  state?.state === "on" ? (
    <HiLightBulb size={options?.size || "16px"} />
  ) : (
    <GoLightBulb size={options?.size || "16px"} />
  );
