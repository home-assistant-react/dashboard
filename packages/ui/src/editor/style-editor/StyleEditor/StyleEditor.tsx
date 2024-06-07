import {
  defaultEnabledCategories,
  defaultExpandedCategories,
  StyleEditorCategory,
} from "@home-assistant-react/types/src/style-editor";
import React from "react";
import { styleCategoryHasValue } from "../helpers";
import { StyleBackgroundColor } from "../style-categories/StyleBackgroundColor";
import { StyleBackgroundGradient } from "../style-categories/StyleBackgroundGradient";
import { StyleBackgroundImage } from "../style-categories/StyleBackgroundImage";
import { StyleBorder } from "../style-categories/StyleBorder";
import { StyleFillAndStroke } from "../style-categories/StyleFillAndStroke";
import { StylePadding } from "../style-categories/StylePadding";
import { StyleShadow } from "../style-categories/StyleShadow";
import { StyleText } from "../style-categories/StyleText";
import { StyleEditorProps } from "./StyleEditor.types";
import { Box, Flex } from "../../../primitives/common";
import { Scrollbars } from "react-custom-scrollbars";
import { StyleEditorProvider } from "@home-assistant-react/providers/src";
import { EditorCategoryWrapper } from "../../components";

export const StyleEditor = React.forwardRef<HTMLDivElement, StyleEditorProps>(
  (props, ref) => {
    const {
      onPropertyChange,
      style,
      styleKey,
      hasSelfScrollContainer = true,
      enabledCategories,
    } = props;
    const isCategoryEnabled = (category: StyleEditorCategory) => {
      if (enabledCategories) {
        return enabledCategories.includes(category);
      }
      return defaultEnabledCategories.includes(category);
    };

    const isCategoryDefaultExpanded = (category: StyleEditorCategory) => {
      if (enabledCategories) {
        return true;
      }
      if (style && styleCategoryHasValue(category, style)) {
        return true;
      }
      return defaultExpandedCategories.includes(category);
    };

    const content = (
      <Flex className={"w-full h-full flex-col"}>
        {isCategoryEnabled(StyleEditorCategory.Text) && (
          <EditorCategoryWrapper
            title={"Text"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.Text,
            )}
          >
            <StyleText />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.BackgroundColor) && (
          <EditorCategoryWrapper
            title={"Background color"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.BackgroundColor,
            )}
          >
            <StyleBackgroundColor />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.BackgroundGradient) && (
          <EditorCategoryWrapper
            title={"Background gradient"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.BackgroundGradient,
            )}
          >
            <StyleBackgroundGradient />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.BackgroundImage) && (
          <EditorCategoryWrapper
            title={"Background image"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.BackgroundImage,
            )}
          >
            <StyleBackgroundImage />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.FillAndStroke) && (
          <EditorCategoryWrapper
            title={"Fill and stroke"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.FillAndStroke,
            )}
          >
            <StyleFillAndStroke />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.Border) && (
          <EditorCategoryWrapper
            title={"Border"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.Border,
            )}
          >
            <StyleBorder />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.Padding) && (
          <EditorCategoryWrapper
            title={"Padding"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.Padding,
            )}
          >
            <StylePadding />
          </EditorCategoryWrapper>
        )}
        {isCategoryEnabled(StyleEditorCategory.Shadow) && (
          <EditorCategoryWrapper
            title={"Shadow"}
            initialIsExpanded={isCategoryDefaultExpanded(
              StyleEditorCategory.Shadow,
            )}
          >
            <StyleShadow />
          </EditorCategoryWrapper>
        )}
        <Box style={{ paddingTop: 40 }} />
      </Flex>
    );
    return (
      <StyleEditorProvider
        value={{
          style: style,
          updateStyle: onPropertyChange,
          selectedStyleKey: styleKey,
        }}
      >
        <Flex ref={ref} className={"w-full h-full flex-col gap-6"}>
          <Flex className={"w-full h-full"}>
            {hasSelfScrollContainer ? (
              <Scrollbars style={{ height: "100%" }}>{content}</Scrollbars>
            ) : (
              content
            )}
          </Flex>
        </Flex>
      </StyleEditorProvider>
    );
  },
);

StyleEditor.displayName = "StyleEditor";
