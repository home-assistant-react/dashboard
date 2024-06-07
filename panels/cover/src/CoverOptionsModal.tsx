import { ModalProps } from "@home-assistant-react/ui/src/components/modals/Modal";
import { Modal } from "@home-assistant-react/ui/src/components/modals/Modal/Modal";
import React from "react";
import {
  Box,
  Flex,
  ControlSlider,
  ControlSliderDirection,
} from "@home-assistant-react/ui/src";
import {
  CoverEntityFeature,
  HassCoverEntityAttributes,
  HassEntityState,
  Panel,
} from "@home-assistant-react/types/src";
import { usePanelCover } from "./usePanelCover";
import { useCoverServices } from "@home-assistant-react/api/src/services";
import { useComputeStateDisplay } from "@home-assistant-react/api/src/hooks";
import {
  getCoverLayoutInfo,
  supportsFeature,
} from "@home-assistant-react/helpers/src/home-assistant";
import {
  isVisibleOnCard,
  isVisibleOnModal,
} from "@home-assistant-react/helpers/src";
import { DEFAULT_MODAL_CARD_SHOW_TITLE } from "./defines";
import { CoverButton } from "./CoverButton";
import { useComputeCoverPositionState } from "./use-compute-cover-position-state";
import { CoverPanel } from "./index";

const classes = {
  Wrapper: "flex-col gap-6",
  Title: "text-3xl font-light text-center",
  Container: "items-center justify-center gap-6",
  ButtonsContainer: "gap-2 flex-col items-center empty:hidden",
};

export interface CoverOptionsModalProps extends Omit<ModalProps, "children"> {
  coverEntity: HassEntityState<HassCoverEntityAttributes>;
  panel: Panel;
}

export const CoverOptionsModal = React.forwardRef<
  HTMLDivElement,
  CoverOptionsModalProps
>((props, ref) => {
  const { options } = usePanelCover();
  const { coverEntity, ...rest } = props;
  const cover = useCoverServices(coverEntity);
  const entityDisplayState = useComputeStateDisplay(coverEntity);
  const entityDisplayValue = useComputeCoverPositionState(coverEntity);

  const layoutInfo = getCoverLayoutInfo(coverEntity);

  const supportsPosition = supportsFeature(
    coverEntity,
    CoverEntityFeature.SET_POSITION,
  );
  const setCoverPosition = (position: number) => {
    cover.setPosition(position);
  };

  const isHalfButtonVisible = isVisibleOnModal(options?.showHalfButton, true);
  const isGlimmerButtonVisible = isVisibleOnModal(
    options?.showGlimmerButton,
    true,
  );

  const isTitleVisible = isVisibleOnCard(
    options?.showTitle,
    DEFAULT_MODAL_CARD_SHOW_TITLE,
  );

  /*const hasButtons =
    layoutInfo.buttons.length > 0 ||
    (supportsPosition && isHalfButtonVisible) ||
    (supportsPosition && isGlimmerButtonVisible);*/

  return (
    <Modal
      title={
        isTitleVisible
          ? CoverPanel.getLabel!(coverEntity, { panel: props.panel })
          : undefined
      }
      {...rest}
      ref={ref}
    >
      <Flex className={classes.Wrapper}>
        {isTitleVisible && (
          <Box className={classes.Title}>
            {entityDisplayState} {entityDisplayValue}
          </Box>
        )}
        <Flex className={classes.Container}>
          <ControlSlider
            max={100}
            backgroundColor={
              props.panel?.styles?.sliderBackground?.backgroundColor ||
              "#E9E1F4"
            }
            fillColor={
              props.panel?.styles?.sliderTrackBackground?.backgroundColor ||
              "#926BC7"
            }
            onChangeFinal={(value) => setCoverPosition(100 - (value || 0))}
            value={100 - (coverEntity.attributes.current_position || 0)}
            direction={ControlSliderDirection.Down}
          />
          <Flex className={classes.ButtonsContainer}>
            {layoutInfo.buttons.map((button, buttonIndex) => {
              return (
                <CoverButton
                  button={button}
                  key={`cover-button-${button}-${buttonIndex}`}
                />
              );
            })}
          </Flex>
          <Flex className={classes.ButtonsContainer}>
            {supportsPosition && isHalfButtonVisible && (
              <CoverButton button={"half"} />
            )}
            {supportsPosition && isGlimmerButtonVisible && (
              <CoverButton button={"glimmer"} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
});

CoverOptionsModal.displayName = "CoverOptionsModal";
