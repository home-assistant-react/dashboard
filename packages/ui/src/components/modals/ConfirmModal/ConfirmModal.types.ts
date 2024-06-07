import React from "react";
import { ButtonProps } from "../../../primitives/Button";
import { ModalProps } from "../Modal";

export interface ConfirmModalProps extends Omit<ModalProps, "footer"> {
  message?: React.ReactNode;
  onConfirm?: () => Promise<void | unknown | never> | void;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}
