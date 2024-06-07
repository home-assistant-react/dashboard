import { useTheme } from "@home-assistant-react/api/src/hooks/providers/useTheme";
import { getCallbackOrTypeValue } from "@home-assistant-react/helpers/src/callbacks/getCallbackOrTypeValue";
import React from "react";
import { Spinner } from "../../../feedback/Spinner";
import { PanelCardProps } from "./PanelCard.types";
import { Box, Flex } from "../../../../primitives/common";
import { cn } from "../../../../helpers";
import { getPanelComponentOrFallback } from "@home-assistant-react/helpers/src/panels/getPanelComponentOrFallback";
import { usePanel } from "@home-assistant-react/api/src";
import { booleanDataAttr } from "@home-assistant-react/helpers/src";

const classes = {
  Wrapper: "select-none h-full overflow-hidden",
};

export const PanelCard = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PanelCardProps>
>((props, ref) => {
  const theme = useTheme();
  const {
    children,
    panelComponent,
    hasShadow = true,
    panelId,
    className,
    group,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isInGroup,
    isGhost: _isGhost,
    ...rest
  } = props;
  const { isActive, panelStyle, sidebar, isLoading, isPreview, panel, view } =
    usePanel();

  const ContentComponent = getPanelComponentOrFallback(panelComponent);
  const hasPagination = group?.groupOptions?.showPagination || true;
  const isGhost =
    _isGhost !== undefined
      ? _isGhost
      : !!sidebar || ContentComponent.hasPanelCard === false;

  const isButton = getCallbackOrTypeValue(ContentComponent.isPushButton, {
    panel,
  });

  return (
    <Flex
      ref={ref}
      data-shadow={hasShadow}
      data-component={panelComponent}
      data-panel-group-pagination={booleanDataAttr(hasPagination)}
      data-is-button={booleanDataAttr(isButton)}
      className={cn(
        !isGhost && classes.Wrapper,
        "panel",
        !isGhost &&
          (isActive?.value ? "default-panel-active" : "default-panel-normal"),
        panelId ? `panel-${panelId}` : undefined,
        hasShadow && !isGhost ? "shadow-xl" : undefined,
        isLoading?.value ? "relative" : undefined,
        className,
      )}
      style={{
        ...ContentComponent.panelInitialStyle,
        ...theme.panelStyles.normal,
        ...(!!view ? theme.panelViewStyles.normal : undefined),
        ...(!!sidebar ? theme.sidebarPanelStyles.normal : undefined),
        ...panelStyle,
        paddingBottom: isInGroup && hasPagination ? 10 : undefined,
        ...(!hasShadow || isGhost ? { boxShadow: "none" } : {}),
      }}
      {...rest}
      onContextMenu={(event) => {
        event.stopPropagation();
      }}
    >
      {!isPreview && <Box className={"hover-bg"} />}
      {children}
      {isLoading?.value && (
        <Flex
          className={
            "absolute items-center justify-center inset-0 bg-black/40 z-[10] animate-in fade-in duration-1000"
          }
        >
          <Spinner className={"text-muted/50 fill-muted/50"} />
        </Flex>
      )}
    </Flex>
  );
});

PanelCard.displayName = "PanelCard";
