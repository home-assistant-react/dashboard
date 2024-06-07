import { PanelFcStyleProperties } from "@home-assistant-react/types/src";

export const getShadowFromDashboardStyle = (style?: PanelFcStyleProperties) => {
  if (style?.noShadow === true) return "none";

  const {
    shadowColor,
    shadowInset,
    shadowShiftRight,
    shadowShiftDown,
    shadowBlur,
    shadowSpread,
    //shadowOpacity,
  } = style || {};

  if (!shadowColor) {
    return "none";
  }

  const inset = shadowInset ? "inset" : "";
  const shiftRight = shadowShiftRight || 0;
  const shiftDown = shadowShiftDown || 0;
  const blur = shadowBlur || 0;
  const spread = shadowSpread || 0;
  //const opacity = shadowOpacity || 0;

  return `${inset} ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px ${shadowColor}`;
};
