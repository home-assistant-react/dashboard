import { useGetPanelStyleToCssStyle } from "@home-assistant-react/helpers/src/panels/useGetPanelStyleToCssStyle";
import React from "react";
import {
  CoverEntityFeature,
  CUSTOM_BORDER_COLOR_CSS_VAR,
  CUSTOM_BORDER_WIDTH_CSS_VAR,
  DirectionStrategy,
  PanelComponentProps,
} from "@home-assistant-react/types/src";
import { CoverOptions } from "./types";
import { Box, cn, Flex } from "@home-assistant-react/ui/src";
import { CoverPanel } from "./index";
import { CoverButton } from "./CoverButton";
import { capitalize, isVisibleOnCard } from "@home-assistant-react/helpers/src";
import { useLongPress } from "@home-assistant-react/hooks/src";
import {
  useComputeStateDisplay,
  usePanel,
} from "@home-assistant-react/api/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { DEFAULT_COVER_CARD_SHOW_TITLE } from "./defines";
import {
  getCoverLayoutInfo,
  supportsFeature,
} from "@home-assistant-react/helpers/src/home-assistant";
import * as config from "./defines";
import { usePanelCover } from "./usePanelCover";

const classes = {
  Cover:
    "w-full h-full flex-col data-[header-direction=bottom]:flex-col-reverse data-[header-direction=right]:flex-row-reverse data-[header-direction=left]:flex-row",
};

export const CoverCard: React.FC<
  Pick<PanelComponentProps<CoverOptions>, "panel">
> = (props) => {
  const panelStyleToCssStyle = useGetPanelStyleToCssStyle();
  const options = props.panel.options;
  const panel = usePanel();
  const { entityState: entity, moreModalDisclosure } = usePanelCover();
  const coverIcon = CoverPanel.getIcon!(entity, {
    size: "30px",
    panel: props.panel,
  });
  const entityDisplayState = useComputeStateDisplay(entity);
  const openMoreModal = () => moreModalDisclosure.open();
  const longPressTitle = useLongPress(openMoreModal);

  React.useEffect(() => {
    panel.updatePanelStyle?.({
      ...panelStyleToCssStyle(
        props.panel.styles?.[`panel${capitalize(entity?.state || "")}` || ""],
      ),
    });
  }, [entity?.state, sanitizeDep(props.panel.styles)]);

  if (!entity) return <></>;

  const showTitle = isVisibleOnCard(
    options?.showTitle,
    DEFAULT_COVER_CARD_SHOW_TITLE,
  );

  const titleCss: React.CSSProperties = {
    ...panelStyleToCssStyle(props.panel.styles?.["title"]),
    borderColor: `var(${CUSTOM_BORDER_COLOR_CSS_VAR}, rgba(200,200,200,.2))`,
  };

  let headerWritingMode: string | undefined = undefined;

  const borderWidth = `var(${CUSTOM_BORDER_WIDTH_CSS_VAR}, 4px)`;
  const isHeaderVertical =
    !options?.headerDirection ||
    options?.headerDirection === DirectionStrategy.Top ||
    options?.headerDirection === DirectionStrategy.Bottom;

  if (!isHeaderVertical) {
    headerWritingMode = "vertical-rl";
    //titleClassNames.push("justify-center");
    if (options?.headerDirection === DirectionStrategy.Right) {
      titleCss.borderLeftWidth = borderWidth;
    } else {
      titleCss.borderRightWidth = borderWidth;
    }
  } else {
    if (options?.headerDirection === DirectionStrategy.Bottom) {
      titleCss.borderTopWidth = borderWidth;
    } else {
      titleCss.borderBottomWidth = borderWidth;
    }
  }

  const layoutInfo = getCoverLayoutInfo(entity);

  const supportsPosition = supportsFeature(
    entity,
    CoverEntityFeature.SET_POSITION,
  );

  if (layoutInfo.buttons && supportsPosition) {
    layoutInfo.buttons.unshift("half");
    layoutInfo.buttons.push("glimmer");
  }

  const visibleButtons = layoutInfo.buttons.filter((button) => {
    return isVisibleOnCard(
      options?.[`show${capitalize(button)}Button` as never],
      config[
        `DEFAULT_COVER_CARD_SHOW_${String(
          button,
        ).toUpperCase()}_BUTTON` as never
      ] || false,
    );
  });

  return (
    <Flex
      data-header-orientation={isHeaderVertical ? "vertical" : "horizontal"}
      data-header-direction={options?.headerDirection}
      data-direction={options?.direction || "horizontal"}
      className={classes.Cover}
    >
      {showTitle && (
        <Flex
          className={"p-2 items-center"}
          style={{ writingMode: headerWritingMode as never, ...titleCss }}
          {...longPressTitle}
        >
          <Box className={"pr-1 pb-1"}>{coverIcon}</Box>
          <Box>
            <Box>{CoverPanel.getLabel!(entity, { panel: props.panel })}</Box>
            <Box className={"text-xs"}>{entityDisplayState}</Box>
          </Box>
        </Flex>
      )}
      <Flex
        className={cn(
          "w-full h-full flex-row",
          options?.direction === "vertical" && "flex-col",
        )}
      >
        {visibleButtons.map((button, buttonIndex) => {
          return (
            <CoverButton
              isVertical={options?.direction === "vertical"}
              isFirst={buttonIndex === 0}
              isLast={buttonIndex === visibleButtons.length - 1}
              customStyle={props.panel.styles?.[`button${capitalize(button)}`]}
              button={button}
              key={`cover-button-${button}-${buttonIndex}`}
              onLongPress={openMoreModal}
              isPanelButton
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
