export enum StyleEditorCategory {
  Text = "Text",
  BackgroundColor = "BackgroundColor",
  BackgroundGradient = "BackgroundGradient",
  BackgroundImage = "BackgroundImage",
  Border = "Border",
  Shadow = "Shadow",
  FillAndStroke = "FillAndStroke",
  Padding = "Padding",
}

export const defaultEnabledCategories = [
  StyleEditorCategory.Text,
  StyleEditorCategory.BackgroundColor,
  StyleEditorCategory.BackgroundGradient,
  StyleEditorCategory.BackgroundImage,
  StyleEditorCategory.Border,
  StyleEditorCategory.Shadow,
  StyleEditorCategory.Padding,
];

export const defaultExpandedCategories = [
  StyleEditorCategory.Text,
  StyleEditorCategory.BackgroundColor,
];
