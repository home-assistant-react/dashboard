import { useDashboard } from "@home-assistant-react/api/src";
import { rgbaToHslString } from "@home-assistant-react/helpers/src/colors/rgbaToHslString";
import { useGetPanelStyleToCssStyle } from "@home-assistant-react/helpers/src/panels/useGetPanelStyleToCssStyle";
import { useLayout } from "@home-assistant-react/ui/src/components/layout/LayoutProvider";
import React from "react";
import { ThemeProviderProps } from "./ThemeProvider.types";
import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { createPortal } from "react-dom";
import { ThemeState } from "@home-assistant-react/types/src/providers/theme-state";
export const ThemeContext = React.createContext<ThemeState | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const panelStyleToCssStyle = useGetPanelStyleToCssStyle();
  const dashboard = useDashboard();
  const layout = useLayout();
  const [styleCss, setStyleCss] = React.useState<string>("");
  const [panelNormalStyles, setPanelNormalStyles] =
    React.useState<React.CSSProperties>({});
  const [viewPanelsStyles, setViewPanelsStyles] =
    React.useState<React.CSSProperties>({});
  const [sidebarPanelsStyles, setSidebarPanelsStyles] =
    React.useState<React.CSSProperties>({});
  const [activePanelStyle] = React.useState<React.CSSProperties>({}); // eslint-disable-line

  const selectedView = dashboard.selectedDashboardView || "all";

  React.useEffect(() => {
    const currentTheme = dashboard.theme?.find((t) => t.theme === layout.theme);
    const currentStyles = currentTheme?.views?.[selectedView];
    const allViewStyles = currentTheme?.views?.["all"];
    document.body.removeAttribute("style");
    const allStyles = panelStyleToCssStyle(
      allViewStyles?.styles?.["background"],
      { useCustomVariables: false },
    );
    getObjectKeys(allStyles).forEach((key) => {
      document.body.style[String(key) as never] = String(allStyles[key]);
    });
    const styles = panelStyleToCssStyle(currentStyles?.styles?.["background"]);
    getObjectKeys(styles).forEach((key) => {
      document.body.style[String(key) as never] = String(styles[key]);
    });

    setStyleCss(
      `:root{${getObjectKeys(currentStyles?.styles?.["colors"] || {}).reduce(
        (acc, styleKey) => {
          if (!currentStyles?.styles?.["colors"]?.[styleKey]) return acc;
          return `${acc}--${styleKey.replace(/\./g, "-")}: ${rgbaToHslString(currentStyles?.styles?.["colors"]?.[styleKey])};`;
        },
        "",
      )}${getObjectKeys(allViewStyles?.styles?.["colors"] || {}).reduce(
        (acc, styleKey) => {
          if (!allViewStyles?.styles?.["colors"]?.[styleKey]) return acc;
          return `${acc}--${styleKey.replace(/\./g, "-")}: ${rgbaToHslString(allViewStyles?.styles?.["colors"]?.[styleKey])};`;
        },
        "",
      )}}`,
    );

    const panelStyles = {
      ...panelStyleToCssStyle(allViewStyles?.styles?.["panels"], {
        useCustomVariables: false,
      }),
      ...panelStyleToCssStyle(currentStyles?.styles?.["panels"], {
        useCustomVariables: false,
      }),
    };

    const panelViewStyles = {
      ...panelStyleToCssStyle(allViewStyles?.styles?.["view-panels"], {
        useCustomVariables: false,
      }),
      ...panelStyleToCssStyle(currentStyles?.styles?.["view-panels"], {
        useCustomVariables: false,
      }),
    };

    const sidebarPanelStyles = {
      ...panelStyleToCssStyle(allViewStyles?.styles?.["sidebar-panels"], {
        useCustomVariables: false,
      }),
      ...panelStyleToCssStyle(currentStyles?.styles?.["sidebar-panels"], {
        useCustomVariables: false,
      }),
    };

    setPanelNormalStyles(panelStyles);
    setViewPanelsStyles(panelViewStyles);
    setSidebarPanelsStyles(sidebarPanelStyles);
  }, [dashboard.theme, layout.theme, selectedView]);

  return (
    <ThemeContext.Provider
      value={{
        panelStyles: {
          normal: panelNormalStyles,
          active: activePanelStyle,
        },
        panelViewStyles: {
          normal: viewPanelsStyles,
          active: viewPanelsStyles,
        },
        sidebarPanelStyles: {
          normal: sidebarPanelsStyles,
          active: sidebarPanelsStyles,
        },
      }}
    >
      {props.children}
      {createPortal(
        <style
          dangerouslySetInnerHTML={{
            __html: styleCss,
          }}
        />,
        document.head,
      )}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "ThemeProvider";
