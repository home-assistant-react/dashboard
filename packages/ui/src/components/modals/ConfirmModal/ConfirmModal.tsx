import { logError } from "@home-assistant-react/helpers/src";
import { getApiErrorMessage } from "@home-assistant-react/helpers/src/errors/getApiErrorMessage";
import { useBooleanState } from "@home-assistant-react/hooks/src/useBooleanState";
import React from "react";
import { Button } from "../../../primitives/Button";
import { ConfirmModalProps } from "./ConfirmModal.types";
import { Modal } from "../Modal/Modal";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onOpenChange,
  onConfirm,
  confirmProps,
  cancelProps,
  confirmLabel = "Conferma",
  cancelLabel = "Annulla",
  error: userDefinedError,
  children,
  ...rest
}) => {
  const isLoading = useBooleanState(false);
  const [asyncError, setAsyncError] = React.useState("");

  const error = userDefinedError || asyncError;

  const handleConfirm = async () => {
    setAsyncError("");

    if (onConfirm) {
      isLoading.true();
      try {
        const results = await onConfirm();
        if (results) {
          const error = getApiErrorMessage(results as never);
          setAsyncError(error.message);
        }
      } catch (e) {
        logError(e);
        throw e;
      }
      isLoading.false();
    }
  };

  const handleClose = () => {
    if (isLoading.state) return;
    onOpenChange?.(false);
  };

  return (
    <Modal
      footer={
        <>
          <Button
            label={cancelLabel}
            onClick={handleClose}
            variant={"outline"}
            size={"lg"}
            isDisabled={isLoading.state}
            {...cancelProps}
          />
          <Button
            label={confirmLabel}
            onClick={handleConfirm}
            size={"lg"}
            isLoading={isLoading.state}
            {...confirmProps}
          />
        </>
      }
      error={error}
      {...rest}
      closeOnOverlayClick={isLoading.state ? false : rest.closeOnOverlayClick}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      {message}
      {children}
    </Modal>
  );
};
