import { useGetPanelStyleToCssStyle } from "@home-assistant-react/helpers/src/panels/useGetPanelStyleToCssStyle";
import React, { CSSProperties } from "react";
import { PanelProps } from "./Panel.types";
import { Box } from "../../../../primitives/common";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { PanelContent } from "../PanelContent";
import { PanelProvider } from "@home-assistant-react/providers/src";
import { useBooleanValue } from "@home-assistant-react/hooks/src";

const classes = {
  Wrapper: "w-full relative",
};

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (props, ref) => {
    const panelStyleToCssStyle = useGetPanelStyleToCssStyle();
    const { view, group, isInGroup, panel, style, children, ...rest } = props;
    const isActive = useBooleanValue();
    const isLoading = useBooleanValue();
    const [panelStyle, setPanelStyle] = React.useState<CSSProperties>({});

    if (!panel) return <></>;
    return (
      <Box
        ref={ref}
        className={[classes.Wrapper, `group-${group.i}`]}
        {...rest}
        style={{
          ...style,
          paddingLeft:
            view?.gridGapHorizontal !== undefined
              ? `${view?.gridGapHorizontal}px`
              : "14px",
          paddingRight:
            view?.gridGapHorizontal !== undefined
              ? `${view?.gridGapHorizontal}px`
              : "14px",
          paddingTop:
            view?.gridGapVertical !== undefined
              ? `${view?.gridGapVertical}px`
              : "10px",
          paddingBottom:
            view?.gridGapVertical !== undefined
              ? `${view?.gridGapVertical}px`
              : "10px",
          ...style,
        }}
      >
        <PanelProvider
          value={{
            isActive,
            isLoading,
            panel,
            panelStyle: {
              ...panelStyleToCssStyle(
                panel.styles?.[isActive.value ? "panelActive" : "panelNormal"],
              ),
              ...panelStyle,
            },
            updatePanelStyle: setPanelStyle,
            sidebar: props.sidebar,
            view: props.view,
          }}
          key={sanitizeDep(panel.options)}
        >
          <PanelContent group={group} panel={panel} isInGroup={isInGroup} />
        </PanelProvider>
        {children}
      </Box>
    );
  },
);

Panel.displayName = "Panel";
