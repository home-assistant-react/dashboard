import { CSSProperties } from "react";

export interface ThemeItem {
  [key: string | number]: number | string | ThemeItem;
}

export interface ThemeTextStyle {
  fontFamily?: CSSProperties["fontFamily"];
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  letterSpacing?: CSSProperties["letterSpacing"];
}

export interface DashboardTheme {
  breakpoints: Record<string, number>;
  panel: {
    normal: CSSProperties;
    active: CSSProperties;
  };
  spaces: ThemeItem;
  sizes: ThemeItem;
  colors: ThemeItem;
  radii: ThemeItem;
  zIndices: ThemeItem;
  fontWeights: ThemeItem;
  rings: ThemeItem;
  shadows: ThemeItem;
  lineHeights: ThemeItem;
  letterSpaces: ThemeItem;
  backdropBlur: ThemeItem;
  textStyles: Record<string, ThemeTextStyle>;
}
