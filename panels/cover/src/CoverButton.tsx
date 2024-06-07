import { useGetPanelStyleToCssStyle } from "@home-assistant-react/helpers/src/panels/useGetPanelStyleToCssStyle";
import { IconFromSet } from "@home-assistant-react/ui/src/components/controls/IconPicker/IconFromSet";
import React from "react";
import {
  DEFAULT_COVER_CARD_SHOW_CLOSE_BUTTON,
  DEFAULT_COVER_CARD_SHOW_GLIMMER_BUTTON,
  DEFAULT_COVER_CARD_SHOW_HALF_BUTTON,
  DEFAULT_COVER_CARD_SHOW_OPEN_BUTTON,
  DEFAULT_COVER_CARD_SHOW_STOP_BUTTON,
  DEFAULT_COVER_GLIMMER_POSITION,
  DEFAULT_COVER_HALF_POSITION,
  DEFAULT_COVER_MODAL_SHOW_CLOSE_BUTTON,
  DEFAULT_COVER_MODAL_SHOW_GLIMMER_BUTTON,
  DEFAULT_COVER_MODAL_SHOW_HALF_BUTTON,
  DEFAULT_COVER_MODAL_SHOW_OPEN_BUTTON,
  DEFAULT_COVER_MODAL_SHOW_STOP_BUTTON,
} from "./defines";
import { CoverButtonProps } from "./types";
import { usePanelCover } from "./usePanelCover";
import { useLongPress } from "@home-assistant-react/hooks/src";
import {
  coverCanClose,
  coverCanCloseTilt,
  coverCanOpen,
  coverCanOpenTilt,
  coverCanStop,
  supportsFeature,
} from "@home-assistant-react/helpers/src/home-assistant";
import {
  CoverEntityFeature,
  CUSTOM_BORDER_COLOR_CSS_VAR,
  CUSTOM_BORDER_WIDTH_CSS_VAR,
} from "@home-assistant-react/types/src";
import {
  COVER_DEFAULT_CLOSE_TILT_ICON,
  COVER_DEFAULT_GLIMMER_ICON,
  COVER_DEFAULT_HALF_ICON,
  COVER_DEFAULT_OPEN_TILT_ICON,
  COVER_DEFAULT_STOP_ICON,
  getCoverCloseIcon,
  getCoverOpenIcon,
} from "@home-assistant-react/icons/src/entities";
import { cn, IconValue, OverlayButton } from "@home-assistant-react/ui/src";
import { Icon } from "@home-assistant-react/icons/src";
import {
  isVisibleOnCard,
  isVisibleOnModal,
} from "@home-assistant-react/helpers/src";
import { useCoverServices } from "@home-assistant-react/api/src/services";
import { getIconPathFromPickerSelection } from "@home-assistant-react/icons/src/helpers/getIconPathFromPickerSelection";

const classes = {
  Button: "w-full items-center justify-center cursor-pointer",
  PanelButton:
    "data-[panel-button=true]:h-full data-[disabled=true]:text-muted-foreground data-[disabled=true]:cursor-not-allowed",
  OptionsPanelButton:
    "h-16 rounded-md bg-muted px-4 data-[disabled=true]:bg-muted/20 data-[disabled=true]:text-muted-foreground",
  OptionsPanelButtonNotDisabled: "hover:bg-accent",
};

export const CoverButton: React.FC<CoverButtonProps> = ({
  button,
  isPanelButton,
  onLongPress,
  customStyle,
  isVertical,
  isLast,
}) => {
  const panelStyleToCssStyle = useGetPanelStyleToCssStyle();
  const { options, entityState } = usePanelCover();
  const cover = useCoverServices(entityState);

  let buttonIcon: string | IconValue = "";
  let isDisabled = false;
  let buttonAction: (() => void) | undefined;
  let isVisible = true;

  switch (button) {
    case "open":
      buttonIcon =
        getIconPathFromPickerSelection(options?.icon_button_open) ||
        getCoverOpenIcon(entityState);
      isDisabled = !coverCanOpen(entityState);
      buttonAction = cover.open.bind(cover);
      isVisible =
        !options ||
        (isPanelButton
          ? isVisibleOnCard(
              options?.showOpenButton,
              DEFAULT_COVER_CARD_SHOW_OPEN_BUTTON,
            )
          : isVisibleOnModal(
              options?.showOpenButton,
              DEFAULT_COVER_MODAL_SHOW_OPEN_BUTTON,
            ));
      break;
    case "close":
      buttonIcon =
        getIconPathFromPickerSelection(options?.icon_button_close) ||
        getCoverCloseIcon(entityState);
      isDisabled = !coverCanClose(entityState);
      buttonAction = cover.close.bind(cover);
      isVisible =
        !options ||
        (isPanelButton
          ? isVisibleOnCard(
              options?.showCloseButton,
              DEFAULT_COVER_CARD_SHOW_CLOSE_BUTTON,
            )
          : isVisibleOnModal(
              options?.showCloseButton,
              DEFAULT_COVER_MODAL_SHOW_CLOSE_BUTTON,
            ));
      break;
    case "stop":
      buttonIcon =
        getIconPathFromPickerSelection(options?.icon_button_stop) ||
        COVER_DEFAULT_STOP_ICON;
      isDisabled = !coverCanStop(entityState);
      buttonAction = async () => {
        if (supportsFeature(entityState, CoverEntityFeature.STOP)) {
          await cover.stop();
        }
        if (supportsFeature(entityState, CoverEntityFeature.STOP_TILT)) {
          await cover.stopTilt();
        }
      };
      isVisible =
        !options ||
        (isPanelButton
          ? isVisibleOnCard(
              options?.showStopButton,
              DEFAULT_COVER_CARD_SHOW_STOP_BUTTON,
            )
          : isVisibleOnModal(
              options?.showStopButton,
              DEFAULT_COVER_MODAL_SHOW_STOP_BUTTON,
            ));
      break;
    case "open-tilt":
      buttonIcon = COVER_DEFAULT_OPEN_TILT_ICON;
      isDisabled = !coverCanOpenTilt(entityState);
      buttonAction = cover.openTilt.bind(cover);
      break;
    case "close-tilt":
      buttonIcon = COVER_DEFAULT_CLOSE_TILT_ICON;
      isDisabled = !coverCanCloseTilt(entityState);
      buttonAction = cover.closeTilt.bind(cover);
      break;
    case "half":
      buttonIcon =
        getIconPathFromPickerSelection(options?.icon_button_half) ||
        COVER_DEFAULT_HALF_ICON;
      isDisabled = !coverCanStop(entityState);
      buttonAction = async () => {
        await cover.setPosition(
          options?.halfPosition || DEFAULT_COVER_HALF_POSITION,
        );
      };
      isVisible =
        !!options &&
        (isPanelButton
          ? isVisibleOnCard(
              options?.showHalfButton,
              DEFAULT_COVER_CARD_SHOW_HALF_BUTTON,
            )
          : isVisibleOnModal(
              options?.showHalfButton,
              DEFAULT_COVER_MODAL_SHOW_HALF_BUTTON,
            ));
      break;
    case "glimmer":
      buttonIcon =
        getIconPathFromPickerSelection(options?.icon_button_glimmer) ||
        COVER_DEFAULT_GLIMMER_ICON;
      isDisabled = !coverCanStop(entityState);
      buttonAction = async () => {
        await cover.setPosition(
          options?.glimmerPosition || DEFAULT_COVER_GLIMMER_POSITION,
        );
      };
      isVisible =
        !!options &&
        (isPanelButton
          ? isVisibleOnCard(
              options?.showGlimmerButton,
              DEFAULT_COVER_CARD_SHOW_GLIMMER_BUTTON,
            )
          : isVisibleOnModal(
              options?.showGlimmerButton,
              DEFAULT_COVER_MODAL_SHOW_GLIMMER_BUTTON,
            ));
      break;
  }

  const longPressHandler = useLongPress(onLongPress, () => buttonAction?.());

  if (!isVisible) return null;

  const buttonCss: React.CSSProperties = {
    borderColor: `var(${CUSTOM_BORDER_COLOR_CSS_VAR}, rgba(200,200,200,.2))`,
  };

  if (!isLast) {
    const borderWidth = `var(${CUSTOM_BORDER_WIDTH_CSS_VAR}, 1px)`;
    if (isVertical) {
      buttonCss.borderBottomWidth = borderWidth;
    } else {
      buttonCss.borderRightWidth = borderWidth;
    }
  }

  return (
    <OverlayButton
      data-panel-button={isPanelButton}
      data-disabled={isDisabled}
      className={cn(
        classes.Button,
        isPanelButton
          ? classes.PanelButton
          : cn(
              classes.OptionsPanelButton,
              !isDisabled && classes.OptionsPanelButtonNotDisabled,
            ),
      )}
      style={{ ...buttonCss, ...panelStyleToCssStyle(customStyle) }}
      isDisabled={isDisabled}
      {...longPressHandler}
    >
      {typeof buttonIcon === "string" ? (
        <Icon path={buttonIcon} size={1} />
      ) : (
        <IconFromSet icon={buttonIcon} />
      )}
    </OverlayButton>
  );
};
