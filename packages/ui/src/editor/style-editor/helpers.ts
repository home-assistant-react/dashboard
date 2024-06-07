import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { PanelFcStyleProperties } from "@home-assistant-react/types/src";
import { StyleEditorCategory } from "@home-assistant-react/types/src/style-editor";

export const styleCategoryHasValue = (
  category: StyleEditorCategory,
  style: PanelFcStyleProperties,
) => {
  const keys = getObjectKeys(style) || [];
  switch (category) {
    case StyleEditorCategory.Text:
      return style.color !== undefined || style.fontSize !== undefined;
    case StyleEditorCategory.BackgroundColor:
      return style.backgroundColor !== undefined;
    case StyleEditorCategory.BackgroundGradient:
      return keys.some((key) => key.startsWith("backgroundGradient"));
    case StyleEditorCategory.BackgroundImage:
      return style.backgroundImageValue !== undefined;
    case StyleEditorCategory.Border:
      return keys.some((key) => key.startsWith("border"));
    case StyleEditorCategory.Padding:
      return (
        style.paddingLeft !== undefined || style.paddingRight !== undefined
      );
    case StyleEditorCategory.Shadow:
      return (
        keys.some((key) => key.startsWith("shadow")) ||
        style.noShadow !== undefined
      );
    case StyleEditorCategory.FillAndStroke:
      return style.fill !== undefined || style.stroke !== undefined;
    default:
      return false;
  }
};
